import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Restituisce l'utente completo, che viene aggiunto alla richiesta dal guard
  }

  @Post('register')
  async register(
    @Body()
    body: {
      nome: string;
      email: string;
      password: string;
      role?: string;
    },
  ) {
    const { nome, email, password, role } = body;
    return this.userService.createUser(nome, email, password, role);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(@Param('id') id: number, @Body() body: Partial<User>) {
    return this.userService.updateUser(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
  @UseGuards(JwtAuthGuard)
  @Get('admins')
  async getAdminUsers(): Promise<User[]> {
    return this.userService.findUsersByRuolo('admin');
  }
}
