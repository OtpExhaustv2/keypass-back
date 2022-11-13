import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { compareHash } from 'src/utils/helpers';
import { RegisterDto } from './dtos';
import { CategoriesService } from 'src/categories/categories.service';
import { UsersService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly categoriesService: CategoriesService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const user = await this.usersService.createUser(registerDto);
      await this.categoriesService.create({ name: 'Default' }, user.id);
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `${error?.meta?.target[0]} already taken!`,
          );
        }
      }
      throw error;
    }
  }

  async validateUser(username: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: username,
      },
    });
    if (!user) throw new NotFoundException('User not found');
    const isPasswordValid = await compareHash(user.password, password);

    return isPasswordValid ? user : null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
