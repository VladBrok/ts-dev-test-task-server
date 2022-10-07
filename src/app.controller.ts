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
import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/user.decorator';
import { LoginUserDto } from './users/dto/login-user.dto';

// todo: extract into an AuthController
@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@User() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('auth/register')
  async register(@Body() user: CreateUserDto) {
    const token = await this.authService.register(user);
    if (!token) {
      throw new ConflictException();
    }
    return token;
  }
}
