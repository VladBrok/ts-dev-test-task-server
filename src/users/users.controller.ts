import {
  Get,
  UseGuards,
  NotFoundException,
  Param,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUser } from './interfaces/update-user.interface';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return await this.getOrThrow(email);
  }

  @Put(':email')
  async update(@Param('email') email: string, @Body() user: UpdateUser) {
    const id = (await this.getOrThrow(email)).id;
    return await this.usersService.update(id, user);
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    const affected = await this.usersService.remove(email);
    if (!affected) {
      throw new NotFoundException();
    }
  }

  async getOrThrow(email: string) {
    const user = await this.usersService.findOne(email);
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
