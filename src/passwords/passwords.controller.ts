import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards';
import { Routes } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { CreatePasswordDto } from './dtos';
import { PasswordsService } from './passwords.service';

@UseGuards(JwtAuthGuard)
@Controller(Routes.PASSWORDS)
export class PasswordsController {
  constructor(private readonly passwordsService: PasswordsService) {}

  @Post()
  create(@Body() createPasswordDto: CreatePasswordDto, @AuthUser() user: User) {
    return this.passwordsService.create(createPasswordDto, user.id);
  }
}
