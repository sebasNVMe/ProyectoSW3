import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { RoleUserEnum } from '../enums/roleUser.enum.js';

interface KeycloakJwtPayload {
  sub: string;
  preferred_username: string;
  realm_access?: { roles: string[] };
}

/** Lo que queda disponible en request.user en los endpoints protegidos. */
export interface AuthenticatedUser {
  keycloakId: string;
  cedUser: number;
  roles: RoleUserEnum[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    const issuer = `${config.getOrThrow<string>('KEYCLOAK_URL')}/realms/${config.getOrThrow<string>('KEYCLOAK_REALM')}`;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      issuer,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        jwksUri: `${issuer}/protocol/openid-connect/certs`,
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
      }),
    });
  }

  validate(payload: KeycloakJwtPayload): AuthenticatedUser {
    const validRoles = Object.values(RoleUserEnum) as string[];
    const roles = (payload.realm_access?.roles ?? []).filter((role) =>
      validRoles.includes(role),
    ) as RoleUserEnum[];

    return {
      keycloakId: payload.sub,
      cedUser: Number(payload.preferred_username),
      roles,
    };
  }
}
