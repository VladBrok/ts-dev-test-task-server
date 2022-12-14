import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
import { TokenBlacklistModule } from 'src/token-blacklist/token-blacklist.module';
import { AuthController } from './auth.controller';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TokenBlacklistModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '1200s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
