import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusUserEnum, User } from '../../auth/entities/user.entity.js';
import { CreateProfessionalDto } from '../dto/create-professional.dto.js';
import { UpdateProfessionalDto } from '../dto/update-professional.dto.js';
import { Professional } from '../entities/professional.entity.js';
import { SpecialityProfEnum,TypeProfEnum} from '../enums/professional.enums.js';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectRepository(Professional) private readonly professionals: Repository<Professional>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async register(dto: CreateProfessionalDto): Promise<Professional> {
    const user = await this.users.findOneBy({ cedUser: dto.cedUser });
    if (!user) throw new ConflictException('No existe un usuario con ese código');
    this.validateSchedule(dto.arrivalTime, dto.departureTime);
    const professional = await this.professionals.save(this.professionals.create({ 
      user, 
      typeProf: dto.typeProf, 
      specialityProf: dto.specialityProf,
      arrivalTime:dto.arrivalTime,
      departureTime: dto.departureTime,
      attentionInterval: dto.attentionInterval,
      unavailableDays: dto.unavailableDays,
    }));
    return professional;
  }

  findAll(): Promise<Professional[]> { return this.professionals.find(); }
  findByCodProf(codProf: number): Promise<Professional | null> { return this.professionals.findOneBy({ codProf }); }
  findBySpeciality(specialityProf: SpecialityProfEnum): Promise<Professional[]> { return this.professionals.findBy({ specialityProf }); }

  async findByCedUser(cedUser: number): Promise<Professional | null> {
    const user = await this.users.findOneBy({ cedUser });
    if (!user) throw new NotFoundException(`Usuario no encontrado: ${cedUser}`);
    return this.professionals.findOne({ where: { user: { cedUser } } });
  }

  async update(codProf: number, dto: UpdateProfessionalDto): Promise<Professional> {
    const professional = await this.findByCodProf(codProf);
    if (!professional) throw new NotFoundException('Profesional no encontrado');
    const arrivalTime = dto.arrivalTime ?? professional.arrivalTime;
    const departureTime = dto.departureTime ?? professional.departureTime;
    this.validateSchedule(arrivalTime, departureTime);
    Object.assign(professional, this.withoutNulls(dto));
    const updated = await this.professionals.save(professional);
    return updated;
  }

  async deactivate(codProf: number): Promise<void> {
    const professional = await this.findByCodProf(codProf);
    if (!professional) throw new NotFoundException('Profesional no encontrado');
    professional.user.statusUser = StatusUserEnum.INACTIVE;
    await this.professionals.save(professional);
  }

  private validateSchedule(arrivalTime: string, departureTime: string): void {
    if (arrivalTime > departureTime) {
      throw new ConflictException('La hora de llegada no puede ser mayor que la de salida');
    }
  }

  private withoutNulls<T extends object>(fields: T): Partial<T> {
    return Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== null && value !== undefined)) as Partial<T>;
  }
}
