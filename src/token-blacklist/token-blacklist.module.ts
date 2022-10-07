import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenBlacklistService } from './token-blacklist.service';
import { TokenBlacklist } from './entities/token-blacklist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TokenBlacklist])],
  providers: [TokenBlacklistService],
  exports: [TokenBlacklistService],
})
export class TokenBlacklistModule {}
