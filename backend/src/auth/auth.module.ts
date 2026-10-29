import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller.js';
import { User } from './entities/user.entity.js';
import { UserService } from './services/user.service.js';
import { KeycloakService } from './services/keycloak.service.js';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { OptionalJwtAuthGuard } from './guards/optional-jwt-auth.guard.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
  ],
  providers: [UserService, JwtStrategy, KeycloakService, OptionalJwtAuthGuard],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService, PassportModule, OptionalJwtAuthGuard],
})
export class AuthModule {}
