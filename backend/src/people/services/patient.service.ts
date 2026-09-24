import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from '../dto/create-patient.dto.js';
import { UpdatePatientDto } from '../dto/update-patient.dto.js';
import { Patient } from '../entities/patient.entity.js';
import { StatusUserEnum, User } from '../../auth/entities/user.entity.js';
import { RoleUserEnum } from '../../auth/enums/roleUser.enum.js';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private readonly patients: Repository<Patient>,
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  async register(dto: CreatePatientDto): Promise<Patient> {
    const user = await this.users.findOneBy({ cedUser: dto.cedUser })
    if (!user) {
      throw new ConflictException('No existe ningun usuario con esa identificación');
    }
    user.roleUser = RoleUserEnum.PATIENT;
    user.statusUser = StatusUserEnum.ACTIVE;
    const patient = await this.patients.save(this.patients.create({
      user,
      dateBirthPatient: dto.dateBirthPatient,
    }));
    return patient;
  }

  findAll(): Promise<Patient[]> { return this.patients.find(); }

  async findByIdPatient(cedUser: number): Promise<Patient | null> {
    return this.patients.findOne({
      where: {
        user: {
          cedUser: cedUser
        }
      }
    });
  }

  findByCodPatient(codPatient: number): Promise<Patient | null> { return this.patients.findOneBy({ codPatient }); }

  async update(cedUser: number, dto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findByIdPatient(cedUser);
    if (!patient) throw new NotFoundException('Paciente no encontrado');
    const { phoneUser, ...fields } = dto;
    Object.assign(patient, this.withoutNulls(fields));
    if (phoneUser !== undefined && phoneUser !== null) {
      patient.user.phoneUser = phoneUser.toString();
    }
    const updated = await this.patients.save(patient);
    return updated;
  }

  async deactivate(cedUser: number): Promise<void> {
    const result = await this.patients.findOne({
      where: {
        user: {
          cedUser: cedUser
        }
      }
    });
    if (!result) throw new NotFoundException('Paciente no encontrado');
    result.user.statusUser = StatusUserEnum.INACTIVE;
    await this.patients.save(result);
  }


  private withoutNulls<T extends object>(fields: T): Partial<T> {
    return Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== null && value !== undefined)) as Partial<T>;
  }
}
