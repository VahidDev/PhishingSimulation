import { Controller, Get, Post, Body } from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { PhishingResponse } from './phishing-response.interface'; 

@Controller('phishing-attempts')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Get()
  async getAllAttempts() {
    return this.phishingService.getAllAttempts();
  }

  @Post('send')
  async sendPhishingAttempt(@Body() body): Promise<PhishingResponse> { 
    return this.phishingService.sendPhishingAttempt(body.email);
  }
}
