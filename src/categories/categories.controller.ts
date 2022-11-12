import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards';
import { Routes } from 'src/utils/constants';
import { AuthUser } from 'src/utils/decorators';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Controller(Routes.CATEGORIES)
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @AuthUser() user: User,
  ) {
    return this.categoriesService.create(createCategoryDto, user.id);
  }

  @Get()
  async getAll(@AuthUser() user: User) {
    return this.categoriesService.getAll(user.id);
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.categoriesService.getOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }
}
