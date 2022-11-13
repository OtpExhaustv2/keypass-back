import { ForbiddenException, Injectable } from '@nestjs/common';
import { CategoriesService } from 'src/categories/categories.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePasswordDto } from './dtos';

@Injectable()
export class PasswordsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(createPasswordDto: CreatePasswordDto, userId: number) {
    const category = await this.categoriesService.getOne(
      createPasswordDto.categoryId,
    );
    if (category.userId !== userId) throw new ForbiddenException();

    return await this.prisma.password.create({
      data: {
        ...createPasswordDto,
        userId,
      },
    });
  }
}
