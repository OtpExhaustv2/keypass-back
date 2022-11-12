import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { hashPassword } from 'src/utils/helpers';
import { CreateUserDetails } from 'src/utils/types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userDetails: CreateUserDetails) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: userDetails.email }, { username: userDetails.username }],
      },
    });

    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    const password = await hashPassword(userDetails.password);
    const data = { ...userDetails, password };
    return await this.prisma.user.create({
      data,
    });
  }
}
