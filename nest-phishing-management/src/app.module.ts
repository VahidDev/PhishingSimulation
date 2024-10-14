import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PhishingModule } from './phishing/phishing.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/PhishingDb'),
    AuthModule,
    PhishingModule,
  ],
})
export class AppModule {}
