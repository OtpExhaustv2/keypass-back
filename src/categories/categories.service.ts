import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dtos';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto, userId: number) {
    try {
      const { name } = createCategoryDto;
      const category = await this.prisma.category.create({
        data: {
          name,
          userId,
        },
      });
      return category;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll(userId: number) {
    return this.prisma.category.findMany({
      where: {
        userId,
      },
      include: {
        passwords: true,
      },
    });
  }

  async getOne(id: number) {
    const category = await this.prisma.category.findFirstOrThrow({
      where: {
        id,
      },
    });
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { name } = updateCategoryDto;
    try {
      const category = await this.prisma.category.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
      return category;
    } catch (error) {
      throw new NotFoundException('Category not found');
    }
  }
}
