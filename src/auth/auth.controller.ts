import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { Routes } from 'src/utils/constants';
import { AuthenticatedRequest } from 'src/utils/types';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: Request & { user: any }) {
    return this.authService.login(req.user);
  }

  @Post('register')
  register(@Body() signUpDto: RegisterDto) {
    return this.authService.register(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req: AuthenticatedRequest) {
    return req.user;
  }
}
