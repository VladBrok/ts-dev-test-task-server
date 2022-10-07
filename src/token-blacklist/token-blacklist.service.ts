import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { TokenBlacklist } from './entities/token-blacklist.entity';
import { Token } from './interfaces/token.interface';

@Injectable()
export class TokenBlacklistService {
  constructor(
    @InjectRepository(TokenBlacklist)
    private readonly tokensRepository: Repository<TokenBlacklist>,
  ) {}

  async findOne(token: string) {
    return await this.tokensRepository.findOneBy({ token });
  }

  async create(token: Token) {
    await this.tokensRepository.save({
      token: token.value,
      expirationInSeconds: token.expirationInSeconds,
    });
    await this.removeExpiredTokens();
  }

  private async removeExpiredTokens() {
    const millisecondsInSecond = 1000;
    const now = Math.floor(Date.now() / millisecondsInSecond);
    await this.tokensRepository.delete({
      expirationInSeconds: LessThan(now),
    });
  }
}
