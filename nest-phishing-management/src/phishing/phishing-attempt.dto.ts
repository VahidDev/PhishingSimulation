import { IsEmail } from 'class-validator';

export class PhishingAttemptDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;
}
