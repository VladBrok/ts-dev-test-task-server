import { Injectable } from '@nestjs/common';
import { hash } from 'src/lib/hash';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async findOneById(id: number) {
    return await this.usersRepository.findOne({
      where: { id },
      relations: { userInfo: true },
    });
  }

  async findOneByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
      relations: { userInfo: true },
    });
  }

  async update(id: number, user: UpdateUserDto) {
    const userInfo = {
      name: user.name,
      phoneNumber: user.phoneNumber,
      address: user.address,
      info: user.info,
    };
    const shouldUpdateInfo = Object.values(userInfo).some((x) => x != null);

    return await this.usersRepository.save({
      id,
      email: user.email,
      passwordHash: user.password ? await hash(user.password) : undefined,
      userInfo: shouldUpdateInfo ? userInfo : undefined,
    });
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete({ id });
    return result.affected;
  }

  async create(user: CreateUserDto) {
    const exists =
      (await this.usersRepository.findOneBy({ email: user.email })) != null;
    if (exists) {
      return null;
    }

    return await this.usersRepository.save({
      email: user.email,
      passwordHash: await hash(user.password),
    });
  }
}
