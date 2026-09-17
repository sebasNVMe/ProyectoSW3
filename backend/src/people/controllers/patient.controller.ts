import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CreatePatientDto } from '../dto/create-patient.dto.js';
import { UpdatePatientDto } from '../dto/update-patient.dto.js';
import { PatientService } from '../services/patient.service.js';
import { PeoplePresenter } from '../people.presenter.js';

@Controller('patients')
export class PatientController {
  constructor(private readonly patients: PatientService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) response: Response) {
    const patients = await this.patients.findAll();
    if (!patients.length) { response.status(HttpStatus.NO_CONTENT); return; }
    return patients.map(PeoplePresenter.patient);
  }

  @Get(':idPatient')
  async findById(@Param('idPatient', ParseIntPipe) idPatient: number) {
    const patient = await this.patients.findByIdPatient(idPatient);
    if (!patient) throw new NotFoundException(`No se encontró el paciente con id: ${idPatient}`);
    return PeoplePresenter.patient(patient);
  }

  @Post()
  async register(@Body() dto: CreatePatientDto, @Res({ passthrough: true }) response: Response) {
    const patient = await this.patients.register(dto);
    response.location(`/patients/${patient.codPatient}`);
    return PeoplePresenter.patient(patient);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePatientDto) {
    return this.patients.update(id, dto).then(PeoplePresenter.patient);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> { await this.patients.delete(id); }

  @Get('codPatient/:codPatient')
  async findByCod(@Param('codPatient', ParseIntPipe) codPatient: number) {
    const patient = await this.patients.findByCodPatient(codPatient);
    if (!patient) throw new NotFoundException(`No se encontró el paciente con id: ${codPatient}`);
    return PeoplePresenter.patient(patient);
  }
}
