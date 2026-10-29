import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleUserEnum } from '../enums/roleUser.enum.js';
import { RolesGuard } from '../guards/roles.guard.js';
import { Roles } from './roles.decorator.js';

/** Exige un token válido y, si se indican roles, que el usuario tenga alguno de ellos. */
export const Auth = (...roles: RoleUserEnum[]) =>
  applyDecorators(UseGuards(AuthGuard('jwt'), RolesGuard), Roles(...roles));
