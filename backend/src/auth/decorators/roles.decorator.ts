import { SetMetadata } from '@nestjs/common';
import { RoleUserEnum } from '../enums/roleUser.enum.js';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleUserEnum[]) =>
  SetMetadata(ROLES_KEY, roles);
