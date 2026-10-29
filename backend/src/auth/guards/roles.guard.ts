import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator.js';
import { RoleUserEnum } from '../enums/roleUser.enum.js';
import type { AuthenticatedUser } from '../strategies/jwt.strategy.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.getAllAndOverride<
      RoleUserEnum[] | undefined
    >(ROLES_KEY, [context.getHandler(), context.getClass()]);
    // Sin roles indicados, basta con estar autenticado
    if (!required || required.length === 0) return true;

    const user: AuthenticatedUser | undefined = context
      .switchToHttp()
      .getRequest().user;
    const allowed =
      !!user && required.some((role) => user.roles.includes(role));
    if (!allowed) {
      throw new ForbiddenException(
        'No tienes permisos para realizar esta acción',
      );
    }
    return true;
  }
}
