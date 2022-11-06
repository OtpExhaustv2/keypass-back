import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { API_BASE } from 'src/utils/constants';

@Controller(`${API_BASE}/users`)
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return 'All users';
  }
}
