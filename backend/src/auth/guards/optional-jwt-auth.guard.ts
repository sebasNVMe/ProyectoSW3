import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Si hay un token válido, rellena request.user; si no, deja pasar como anónimo. */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleRequest(_err: any, user: any): any {
    return user || null;
  }
}
