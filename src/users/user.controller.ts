import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards';
import { Routes } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';

@Controller(Routes.USERS)
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(@AuthUser() user: User) {
    return user;
  }
}
