import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePatientDto } from '../dto/create-patient.dto.js';
import { UpdatePatientDto } from '../dto/update-patient.dto.js';
import { Patient } from '../entities/patient.entity.js';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient) private readonly patients: Repository<Patient>,
  ) {}

  async register(dto: CreatePatientDto): Promise<Patient> {
    if (await this.patients.existsBy({ idPatient: dto.idPatient })) {
      throw new ConflictException('Ya existe un paciente con esa identificación');
    }
    const patient = await this.patients.save(this.patients.create({
      ...dto,
      phonePatient: dto.phonePatient?.toString(),
    }));
    return patient;
  }

  findAll(): Promise<Patient[]> { return this.patients.find(); }
  findByIdPatient(idPatient: number): Promise<Patient | null> { return this.patients.findOneBy({ idPatient }); }
  findByCodPatient(codPatient: number): Promise<Patient | null> { return this.patients.findOneBy({ codPatient }); }

  async update(codPatient: number, dto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.findByCodPatient(codPatient);
    if (!patient) throw new NotFoundException('Paciente no encontrado');
    const { phonePatient, ...fields } = dto;
    Object.assign(patient, this.withoutNulls(fields));
    if (phonePatient !== undefined && phonePatient !== null) {
      patient.phonePatient = phonePatient.toString();
    }
    const updated = await this.patients.save(patient);
    return updated;
  }

  async delete(codPatient: number): Promise<void> {
    const result = await this.patients.delete(codPatient);
    if (!result.affected) throw new NotFoundException('Paciente no encontrado');
  }

  /** Spring's partial-update DTO ignores fields explicitly sent as null. */
  private withoutNulls<T extends object>(fields: T): Partial<T> {
    return Object.fromEntries(Object.entries(fields).filter(([, value]) => value !== null && value !== undefined)) as Partial<T>;
  }
}
