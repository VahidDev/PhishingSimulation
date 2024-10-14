import { IsString, IsEmail, MinLength} from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @IsString({ message: 'Password is required' })
  password: string;
}