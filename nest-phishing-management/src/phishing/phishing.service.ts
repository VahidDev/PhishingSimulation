import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PhishingAttempt } from './phishing.schema';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { PhishingResponse } from './phishing-response.interface';
import https from 'https';
import { BadRequestException } from '@nestjs/common';
import { PhishingStatuses } from './phishing-statuses.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PhishingService {
  private readonly phishingApiUrl: string;
  private readonly phishingApiUrlExternal: string;

  constructor(
    @InjectModel('PhishingAttempt') private attemptModel: Model<PhishingAttempt>,
    private readonly httpService: HttpService,
  ) {
    this.phishingApiUrl = process.env.PHISHING_API_URL;
    this.phishingApiUrlExternal = process.env.PHISHING_API_URL_EXTERNAL;
  }

  async getAllAttempts(): Promise<PhishingAttempt[]> {
    return this.attemptModel.find().exec();
  }

  async sendPhishingAttempt(email: string): Promise<PhishingResponse> {
    if (!email) {
      throw new BadRequestException('Email cannot be empty');
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }
  
    const attemptId = uuidv4();
    const content = `${this.phishingApiUrlExternal}/api/phishing/click/${attemptId}`;
    const newAttempt = new this.attemptModel({
      email,
      status: PhishingStatuses.Pending,
      attemptId: attemptId,
      content: content,
      clicked: false
    });
    const savedAttempt = await newAttempt.save();

    try{

      const agent = new https.Agent({
        rejectUnauthorized: false,
      });
    
      const response = await firstValueFrom(
        this.httpService.post<PhishingResponse>(`${this.phishingApiUrl}/send`, { email, content }, { httpsAgent: agent }),
      );
      
      await this.attemptModel.findByIdAndUpdate(savedAttempt._id, { status: PhishingStatuses.Sent });

      return response.data;
    }
    catch (error) {

      await this.attemptModel.findByIdAndUpdate(savedAttempt._id, { status: PhishingStatuses.Failed });
      throw new BadRequestException('Error sending phishing attempt.');
    }
  }  
}
