import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/helpers';
import { CreateUserDetails } from 'src/utils/types';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: userDetails.email }, { username: userDetails.username }],
      },
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const password = await hashPassword(userDetails.password);
    const data = { ...userDetails, password };
    return await this.prisma.user.create({
      data,
    });
  }

  async getOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async getOneWitoutPassword(id: number) {
    const user = await this.getOne(id);
    const { password, ...rest } = user;
    return rest;
  }
}
