import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
import { TokenBlacklistModule } from 'src/token-blacklist/token-blacklist.module';

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    TokenBlacklistModule,
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '180s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
