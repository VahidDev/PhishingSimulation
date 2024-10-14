import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model'; 
import { RegisterDto } from './register.dto'; 
import { LoginDto } from './login.dto'; 

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const existingUser = await this.userModel.findOne({ email });

    if (!existingUser) {
      throw new UnauthorizedException('Invalid credentials: User does not exist');
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials: Incorrect password');
    }

    const payload = { email: existingUser.email, sub: existingUser._id };
    
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const payload = { email: newUser.email, sub: newUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
