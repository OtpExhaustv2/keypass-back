import { Module } from '@nestjs/common';
import { PasswordsService } from './passwords.service';
import { PasswordsController } from './passwords.controller';
import { CategoriesService } from 'src/categories/categories.service';

@Module({
  controllers: [PasswordsController],
  providers: [PasswordsService, CategoriesService],
})
export class PasswordsModule {}
