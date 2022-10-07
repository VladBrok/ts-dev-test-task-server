import {
  Controller,
  Post,
  UseGuards,
  Body,
  ConflictException,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { User } from './users/user.decorator';
import { LoginUserDto } from './users/dto/login-user.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@User() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('auth/logout')
  async logout(@User() user: any) {
    return this.authService.logout({
      value: user.token,
      expirationInSeconds: user.exp,
    });
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
