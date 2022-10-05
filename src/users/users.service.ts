import { Injectable } from '@nestjs/common';
import { hash } from 'src/lib/hash';
import { CreateUser } from './interfaces/create-user.interface';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'john',
      passwordHash: 'changeme',
    },
    {
      id: 2,
      email: 'maria',
      passwordHash: 'guess',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(user: CreateUser) {
    const exists = (await this.findOne(user.email)) != null;
    if (exists) {
      return null;
    }

    const newUser = {
      ...user,
      id: this.users.at(-1).id + 1,
      passwordHash: await hash(user.password),
    };
    this.users.push(newUser);
    return newUser;
  }
}
