import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { compareHash } from 'src/utils/helpers';
import { ValidateUserDetails } from 'src/utils/types';
import { UserService } from 'src/users/user.service';
import { RegisterDto } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      return this.userService.createUser(registerDto);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            `${error?.meta?.target[0]} already taken!`,
          );
        }
      }
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
