import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  UnauthorizedException,
  Body,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUser } from './users/interfaces/create-user.interface';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() user: CreateUser) {
    const token = await this.authService.register(user);
    if (!token) {
      throw new ConflictException();
    }
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const profile = await this.authService.getProfile(req.user.email);
    if (!profile) {
      throw new NotFoundException();
    }
    return profile;
  }
}
