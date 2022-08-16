import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

// The controllers handle requests to access the services

// Keep controllers clean, only with logic related to requests
// Services are busy with business logic

// Pipes - in NestJs they are functrions that transform your data

// www.example.com/auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // www.example.com/auth/signup
  @Post('signup')
  // DTO contains email and password. They are validated through global pipes.
  signup(@Body() dto: AuthDto) {
    console.log(dto);
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
}
