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
import { UserService } from '../services/user.service.js';
import { RegisterUserDto } from '../dto/registerUser.dto.js';
import { LoginRequestDto } from '../dto/loginRequest.dto.js';
import { UpdateUserDto } from '../dto/updateUser.dto.js';
import { RoleUserEnum } from '../enums/roleUser.enum.js';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() dto: LoginRequestDto) {
    return this.userService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterUserDto) {
    return this.userService.register(dto);
  }

  @Get('users')
  findByRole(@Query('role') role: RoleUserEnum) {
    return this.userService.findByRole(role);
  }

  @Get('users/:cedula')
  findByCedula(@Param('cedula', ParseIntPipe) cedula: number) {
    return this.userService.findByCedula(cedula);
  }

  @Get('users/cod/:codigo')
  findByCodigo(@Param('codigo', ParseIntPipe) codigo: number) {
    return this.userService.findByCodigoUser(codigo);
  }

  @Put('users/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @Delete('users/:id')
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deactivate(id);
  }
}
