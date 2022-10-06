import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoEntity } from './entities/user-info.entity';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserInfoEntity])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
