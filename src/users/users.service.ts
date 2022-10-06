import { Injectable } from '@nestjs/common';
import { hash } from 'src/lib/hash';
import { CreateUser } from './interfaces/create-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateUser } from './interfaces/update-user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: { userInfo: true },
    });
  }

  async update(id: number, user: UpdateUser) {
    const userInfo = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
      info: user.info,
    };
    const shouldAddInfo = Object.values(userInfo).some((x) => x != null);

    return await this.usersRepository.save({
      id,
      email: user.email,
      passwordHash: await hash(user.password),
      userInfo: shouldAddInfo ? userInfo : undefined,
    });
  }

  async remove(email: string) {
    const result = await this.usersRepository.delete({ email });
    return result.affected;
  }

  async create(user: CreateUser) {
    const exists = (await this.findOne(user.email)) != null;
    if (exists) {
      return null;
    }

    return await this.usersRepository.save({
      email: user.email,
      passwordHash: await hash(user.password),
    });
  }
}
