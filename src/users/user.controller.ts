import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards';
import { Routes } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { UsersService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller(Routes.USERS)
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(@AuthUser() user: User) {
    return user;
  }

  @Get('me')
  getOne(@AuthUser() user: User) {
    return this.usersService.getOneWitoutPassword(user.id);
  }
}
