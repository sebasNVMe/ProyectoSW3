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

import { UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { AuthenticatedUser } from '../strategies/jwt.strategy.js'
import { OptionalJwtAuthGuard } from '../guards/optional-jwt-auth.guard.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import { Auth } from '../decorators/auth.decorator.js';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(@Body() dto: LoginRequestDto) {
    return this.userService.login(dto);
  }

  @Post('register')
  //@UseGuards(OptionalJwtAuthGuard)
  register(
    @Body() dto: RegisterUserDto,
    @CurrentUser() actor: AuthenticatedUser | null,
  ) {
    return this.userService.register(dto, actor);
  }

  @Auth()
  @Get('me')
  me(@CurrentUser() actor: AuthenticatedUser) {
    return actor;
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.SCHEDULER)
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

  @Auth()
  @Put('users/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @CurrentUser() actor: AuthenticatedUser,
  ) {
    return this.userService.update(id, dto, actor);
  }

  @Auth(RoleUserEnum.ADMIN)
  @Delete('users/:id')
  deactivate(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deactivate(id);
  }
}
