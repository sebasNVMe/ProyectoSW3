import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CreatePatientDto } from '../dto/create-patient.dto.js';
import { UpdatePatientDto } from '../dto/update-patient.dto.js';
import { PatientService } from '../services/patient.service.js';
import { Patient } from '../entities/patient.entity.js';

@Controller('patients')
export class PatientController {
  constructor(private readonly patients: PatientService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) response: Response): Promise<Patient[]> {
    const patients = await this.patients.findAll();
    if (!patients.length) { response.status(HttpStatus.NO_CONTENT); return []; }
    return patients;
  }

  @Get(':idPatient')
  async findById(@Param('idPatient', ParseIntPipe) idPatient: number): Promise <Patient> {
    const patient = await this.patients.findByIdPatient(idPatient);
    if (!patient) throw new NotFoundException(`No se encontró el paciente con id: ${idPatient}`);
    return patient;
  }

  @Post()
  async register(@Body() dto: CreatePatientDto, @Res({ passthrough: true }) response: Response): Promise<Patient> {
    const patient = await this.patients.register(dto);
    response.location(`/patients/${patient.codPatient}`);
    return patient;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto): Promise<Patient> {
    const patient = await this.patients.update(id, dto);
    return patient;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> { await this.patients.deactivate(id); }

  @Get('codPatient/:codPatient')
  async findByCod(@Param('codPatient', ParseIntPipe) codPatient: number): Promise<Patient> {
    const patient = await this.patients.findByCodPatient(codPatient);
    if (!patient) throw new NotFoundException(`No se encontró el paciente con id: ${codPatient}`);
    return patient;
  }
}
