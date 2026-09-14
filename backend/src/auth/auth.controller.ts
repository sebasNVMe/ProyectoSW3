import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterUserDto } from './dto/registerUser.dto.js';
import { LoginRequestDto } from './dto/loginRequest.dto.js';
import { UpdateUserDto } from './dto/updateUser.dto.js';
import { RoleUserEnum } from './enums/roleUser.enum.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginRequestDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Get('users')
  findByRole(@Query('role') role: RoleUserEnum) {
    return this.authService.findByRole(role);
  }

  @Get('users/:cedula')
  findByCedula(@Param('cedula', ParseIntPipe) cedula: number) {
    return this.authService.findByCedula(cedula);
  }

  @Get('users/cod/:codigo')
  findByCodigo(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.authService.findByCodigoUser(codigo);
  }

  @Put('users/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.authService.update(id, dto);
  }

  @Delete('users/:id')
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deactivate(id);
  }
}
