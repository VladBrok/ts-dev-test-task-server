import {
  Get,
  UseGuards,
  NotFoundException,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.decorator';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // todo: add type (user: {id: number})
  async findOne(@User() user: any) {
    return await this.getOrThrow(user.id);
  }

  @Put()
  async update(@User() validatedUser: any, @Body() user: UpdateUserDto) {
    await this.getOrThrow(validatedUser.id);
    return await this.usersService.update(validatedUser.id, user);
  }

  @Delete()
  async remove(@User() user: any) {
    const affected = await this.usersService.remove(user.id);

    if (!affected) {
      throw new NotFoundException();
    }
  }

  async getOrThrow(id: number) {
    const user = await this.usersService.findOneById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
