/* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

// The controllers handle requests to access the services

// Keep controllers clean, only with logic related to requests
// Services are busy with business logic

// www.example.com/auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // www.example.com/auth/signup
  @Post('signup')
  signup() {
    return this.authService.signup()
  }

  @Post('signin')
  signin() {
    return this.authService.signin()
  }
}
