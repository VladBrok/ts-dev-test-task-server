import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'src/lib/hash';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { TokenBlacklistService } from '../token-blacklist/token-blacklist.service';
import { Token } from '../token-blacklist/interfaces/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenBlacklistService: TokenBlacklistService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (user && (await compare(password, user.passwordHash))) {
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: LoginUserDto) {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(token: Token) {
    await this.tokenBlacklistService.create(token);
  }

  async register(user: CreateUserDto) {
    const createdUser = await this.usersService.create(user);
    if (!createdUser) {
      return null;
    }

    return await this.login({
      id: createdUser.id,
      email: createdUser.email,
      password: user.password,
    });
  }
}
