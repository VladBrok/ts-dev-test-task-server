import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  ConflictException,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUser } from './users/interfaces/create-user.interface';

// todo: extract into an AuthController
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
}
