import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'src/lib/hash';
import { CreateUser } from 'src/users/interfaces/create-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (user && compare(pass, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(payload: any) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: CreateUser) {
    const created = await this.usersService.create(user);
    if (!created) {
      return null;
    }
    return await this.login({ email: created.email });
  }
}
