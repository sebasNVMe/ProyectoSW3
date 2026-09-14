import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { User, StatusUserEnum } from './entities/user.entity.js';
import { RoleUserEnum } from './enums/roleUser.enum.js';
import { RegisterUserDto } from './dto/registerUser.dto.js';
import { LoginRequestDto } from './dto/loginRequest.dto.js';
import { LoginResponseDto } from './dto/loginResponse.dto.js';
import { UpdateUserDto } from './dto/updateUser.dto.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<User> {
    const exists = await this.userRepository.findOneBy({
      cedUser: dto.cedUser,
    });
    if (exists) {
      throw new ConflictException('Ya existe un usuario con esa cédula');
    }

    const hashedPassword = await argon2.hash(dto.passwordUser);

    const user = this.userRepository.create({
      ...dto,
      passwordUser: hashedPassword,
      statusUser: StatusUserEnum.ACTIVE,
    });

    return this.userRepository.save(user);
  }

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.userRepository.findOneBy({ cedUser: dto.cedUser });
    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const passwordMatches = await argon2.verify(
      user.passwordUser,
      dto.password,
    );
    if (!passwordMatches) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    if (user.statusUser === StatusUserEnum.INACTIVE) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const token = this.jwtService.sign({
      sub: user.cedUser.toString(),
      role: user.roleUser,
    });

    return new LoginResponseDto(
      token,
      user.roleUser,
      user.codUser,
      user.cedUser,
      user.nameUser,
    );
  }

  async findByRole(role: RoleUserEnum): Promise<User[]> {
    return this.userRepository.findBy({ roleUser: role });
  }

  async findByCedula(cedUser: number): Promise<User | null> {
    return this.userRepository.findOneBy({ cedUser });
  }

  async findByCodigoUser(codUser: number): Promise<User | null> {
    return this.userRepository.findOneBy({ codUser });
  }

  async existsByCedula(cedUser: number): Promise<boolean> {
    const count = await this.userRepository.countBy({ cedUser });
    return count > 0;
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ codUser: id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (dto.passwordUser) {
      dto.passwordUser = await argon2.hash(dto.passwordUser);
    }

    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async deactivate(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ codUser: id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    user.statusUser = StatusUserEnum.INACTIVE;
    await this.userRepository.save(user);
  }
}
