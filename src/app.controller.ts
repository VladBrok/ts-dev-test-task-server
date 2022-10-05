import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  UnauthorizedException,
  Body,
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
      // todo: throw different exception
      throw new UnauthorizedException();
    }
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    // todo: return more data (name, info...)
    return req.user;
  }
}
