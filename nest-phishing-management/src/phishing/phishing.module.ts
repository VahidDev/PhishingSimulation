import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';
import { PhishingAttemptSchema } from './phishing.schema';
import { HttpModule } from '@nestjs/axios'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'PhishingAttempt', schema: PhishingAttemptSchema }]),
    HttpModule 
  ],
  controllers: [PhishingController],
  providers: [PhishingService],
})
export class PhishingModule {}
