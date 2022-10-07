import {
  Get,
  UseGuards,
  NotFoundException,
  Param,
  Put,
  Body,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.getOrThrow(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ) {
    await this.getOrThrow(id);
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const affected = await this.usersService.remove(id);
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
