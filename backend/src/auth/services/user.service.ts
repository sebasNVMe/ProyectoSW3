import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiResponseDto } from '../../commons/dto/apiResponse.dto.js';
import { LoginRequestDto } from '../dto/loginRequest.dto.js';
import { LoginResponseDto } from '../dto/loginResponse.dto.js';
import { RegisterUserDto } from '../dto/registerUser.dto.js';
import { UpdateUserDto } from '../dto/updateUser.dto.js';
import { StatusUserEnum, User } from '../entities/user.entity.js';
import { RoleUserEnum } from '../enums/roleUser.enum.js';
import { KeycloakService } from './keycloak.service.js';
import { ForbiddenException } from '@nestjs/common';
import type { AuthenticatedUser } from '../strategies/jwt.strategy.js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly keycloakService: KeycloakService,
  ) {}

  async register(
    dto: RegisterUserDto,
    actor: AuthenticatedUser | null,
  ): Promise<ApiResponseDto<User>> {
    //this.assertCanAssignRole(dto.roleUser, actor);
    if (await this.userRepository.existsBy({ cedUser: dto.cedUser })) {
      throw new ConflictException('Ya existe un usuario con esa cédula');
    }

    // 1. Se crea la cuenta (con contraseña y rol) en Keycloak
    const keycloakId = await this.keycloakService.createUser({
      username: String(dto.cedUser),
      firstName: dto.nameUser,
      lastName: dto.lastNameUser,
      password: dto.passwordUser,
      role: dto.roleUser,
    });

    // 2. Se guarda el perfil en la BD, sin la contraseña
    try {
      const { passwordUser: _password, ...profile } = dto;
      const user = this.userRepository.create({
        ...profile,
        keycloakId,
        statusUser: StatusUserEnum.ACTIVE,
      });
      const saved = await this.userRepository.save(user);
      return new ApiResponseDto('Usuario registrado exitosamente', saved);
    } catch (error) {
      // Si falla el guardado local, no dejamos una cuenta huérfana en Keycloak
      await this.keycloakService.deleteUser(keycloakId).catch(() => undefined);
      throw error;
    }
  }

  /** El registro público solo crea pacientes; cualquier otro rol exige un administrador. */
  private assertCanAssignRole(
    role: RoleUserEnum,
    actor: AuthenticatedUser | null,
  ): void {
    if (role === RoleUserEnum.PATIENT) return;
    if (!actor) {
      throw new UnauthorizedException(
        'Debes iniciar sesión como administrador para registrar este rol',
      );
    }
    if (!actor.roles.includes(RoleUserEnum.ADMIN)) {
      throw new ForbiddenException(
        'Solo un administrador puede registrar este rol',
      );
    }
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    // Keycloak verifica la contraseña y cuenta los intentos fallidos
    const tokens = await this.keycloakService.login(
      String(dto.cedUser),
      dto.password,
    );

    const user = await this.userRepository.findOneBy({ cedUser: dto.cedUser });
    if (!user) {
      throw new UnauthorizedException('Cédula o contraseña incorrectas');
    }
    if (user.statusUser === StatusUserEnum.INACTIVE) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    return new LoginResponseDto(
      tokens.access_token,
      user.roleUser,
      user.codUser,
      user.cedUser,
      user.nameUser,
    );
  }

  findByRole(role: RoleUserEnum): Promise<User[]> {
    return this.userRepository.findBy({ roleUser: role });
  }

  findByCedula(cedUser: number): Promise<User | null> {
    return this.userRepository.findOneBy({ cedUser });
  }

  findByCodigoUser(codUser: number): Promise<User | null> {
    return this.userRepository.findOneBy({ codUser });
  }

  async existsByCedula(cedUser: number): Promise<boolean> {
    return this.userRepository.existsBy({ cedUser });
  }

  async update(
    id: number,
    dto: UpdateUserDto,
    actor: AuthenticatedUser,
  ): Promise<ApiResponseDto<User>> {
    const user = await this.userRepository.findOneBy({ codUser: id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const isAdmin = actor.roles.includes(RoleUserEnum.ADMIN);
    if (!isAdmin && user.keycloakId !== actor.keycloakId) {
      throw new ForbiddenException('Solo puedes modificar tu propio perfil');
    }
    if (dto.statusUser && !isAdmin) {
      throw new ForbiddenException(
        'Solo un administrador puede cambiar el estado de una cuenta',
      );
    }

    const { passwordUser, statusUser, ...profile } = dto;

    if (user.keycloakId) {
      if (passwordUser) {
        await this.keycloakService.resetPassword(user.keycloakId, passwordUser);
      }
      if (statusUser) {
        await this.keycloakService.setEnabled(
          user.keycloakId,
          statusUser === StatusUserEnum.ACTIVE,
        );
      }
    }

    // Solo se aplican los campos que realmente vinieron en la petición
    const changes = Object.fromEntries(
      Object.entries(profile).filter(([, value]) => value !== undefined),
    );
    Object.assign(user, changes);
    if (statusUser) user.statusUser = statusUser;

    const saved = await this.userRepository.save(user);
    return new ApiResponseDto('Usuario actualizado exitosamente', saved);
  }

  async deactivate(id: number): Promise<ApiResponseDto<null>> {
    const user = await this.userRepository.findOneBy({ codUser: id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    if (user.keycloakId) {
      await this.keycloakService.setEnabled(user.keycloakId, false);
    }
    user.statusUser = StatusUserEnum.INACTIVE;
    await this.userRepository.save(user);
    return new ApiResponseDto('Usuario desactivado exitosamente', null);
  }
}
