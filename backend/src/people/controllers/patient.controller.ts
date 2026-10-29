/*import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreatePatientDto } from '../dto/create-patient.dto.js';
import { UpdatePatientDto } from '../dto/update-patient.dto.js';
import { PatientService } from '../services/patient.service.js';
import { Patient } from '../entities/patient.entity.js';
import { Auth } from '../../auth/decorators/auth.decorator.js';
import { RoleUserEnum } from '../../auth/enums/roleUser.enum.js';


@Controller('patients')
export class PatientController {
  constructor(private readonly patients: PatientService) {}

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.PROFESSIONAL, RoleUserEnum.SCHEDULER)
  @Get()
  async findAll(
    @Res({ passthrough: true }) response: Response,
  ): Promise<Patient[]> {
    const patients = await this.patients.findAll();
    if (!patients.length) {
      response.status(HttpStatus.NO_CONTENT);
      return [];
    }
    return patients;
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.PROFESSIONAL, RoleUserEnum.SCHEDULER)
  @Get(':idPatient')
  async findById(
    @Param('idPatient', ParseIntPipe) idPatient: number,
  ): Promise<Patient> {
    const patient = await this.patients.findByIdPatient(idPatient);
    if (!patient)
      throw new NotFoundException(
        `No se encontró el paciente con id: ${idPatient}`,
      );
    return patient;
  }

  @Auth()
  @Post()
  async register(
    @Body() dto: CreatePatientDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Patient> {
    const patient = await this.patients.register(dto);
    response.location(`/patients/${patient.codPatient}`);
    return patient;
  }

  @Auth()
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePatientDto,
  ): Promise<Patient> {
    const patient = await this.patients.update(id, dto);
    return patient;
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.PATIENT)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.patients.deactivate(id);
  }

  @Auth()
  @Get('codPatient/:codPatient')
  async findByCod(
    @Param('codPatient', ParseIntPipe) codPatient: number,
  ): Promise<Patient> {
    const patient = await this.patients.findByCodPatient(codPatient);
    if (!patient)
      throw new NotFoundException(
        `No se encontró el paciente con id: ${codPatient}`,
      );
    return patient;
  }
}*/

import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { CreatePatientDto } from '../dto/create-patient.dto.js';
import { UpdatePatientDto } from '../dto/update-patient.dto.js';
import { PatientService } from '../services/patient.service.js';
import { Patient } from '../entities/patient.entity.js';
import { Auth } from '../../auth/decorators/auth.decorator.js';
import { CurrentUser } from '../../auth/decorators/current-user.decorator.js';
import { RoleUserEnum } from '../../auth/enums/roleUser.enum.js';
import type { AuthenticatedUser } from '../../auth/strategies/jwt.strategy.js';

const MANAGERS = [RoleUserEnum.ADMIN, RoleUserEnum.SCHEDULER];
const READERS = [...MANAGERS, RoleUserEnum.PROFESSIONAL];

/** El personal autorizado accede a cualquier paciente; un paciente, solo al suyo. */
function assertCanAccess(
  actor: AuthenticatedUser,
  patientCedula: number,
  staffRoles: RoleUserEnum[],
): void {
  const isStaff = staffRoles.some((role) => actor.roles.includes(role));
  if (!isStaff && Number(patientCedula) !== actor.cedUser) {
    throw new ForbiddenException(
      'Solo puedes acceder a tu propio registro de paciente',
    );
  }
}

@Controller('patients')
export class PatientController {
  constructor(private readonly patients: PatientService) {}

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.PROFESSIONAL, RoleUserEnum.SCHEDULER)
  @Get()
  async findAll(
    @Res({ passthrough: true }) response: Response,
  ): Promise<Patient[]> {
    const patients = await this.patients.findAll();
    if (!patients.length) {
      response.status(HttpStatus.NO_CONTENT);
      return [];
    }
    return patients;
  }

  @Auth(
    RoleUserEnum.ADMIN,
    RoleUserEnum.PROFESSIONAL,
    RoleUserEnum.SCHEDULER,
    RoleUserEnum.PATIENT,
  )
  @Get(':idPatient')
  async findById(
    @Param('idPatient', ParseIntPipe) idPatient: number,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<Patient> {
    // La cédula viene en la URL, así que se comprueba antes de consultar
    assertCanAccess(actor, idPatient, READERS);

    const patient = await this.patients.findByIdPatient(idPatient);
    if (!patient)
      throw new NotFoundException(
        `No se encontró el paciente con id: ${idPatient}`,
      );
    return patient;
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.SCHEDULER, RoleUserEnum.PATIENT)
  @Post()
  async register(
    @Body() dto: CreatePatientDto,
    @CurrentUser() actor: AuthenticatedUser,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Patient> {
    // Un paciente solo crea su propio registro; el personal puede crear el de cualquiera
    assertCanAccess(actor, dto.cedUser, MANAGERS);

    const patient = await this.patients.register(dto);
    response.location(`/patients/${patient.codPatient}`);
    return patient;
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.SCHEDULER, RoleUserEnum.PATIENT)
  @Put(':id') // :id es la cédula
  async update(
    @Param('id', ParseIntPipe) cedula: number,
    @Body() dto: UpdatePatientDto,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<Patient> {
    assertCanAccess(actor, cedula, MANAGERS);
    return this.patients.update(cedula, dto);
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.PATIENT)
  @Delete(':id') // :id es la cédula
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('id', ParseIntPipe) cedula: number,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<void> {
    assertCanAccess(actor, cedula, [RoleUserEnum.ADMIN]);
    await this.patients.deactivate(cedula);
  }

  @Auth(
    RoleUserEnum.ADMIN,
    RoleUserEnum.SCHEDULER,
    RoleUserEnum.PROFESSIONAL,
    RoleUserEnum.PATIENT,
  )
  @Get('codPatient/:codPatient')
  async findByCod(
    @Param('codPatient', ParseIntPipe) codPatient: number,
    @CurrentUser() actor: AuthenticatedUser,
  ): Promise<Patient> {
    const patient = await this.patients.findByCodPatient(codPatient);
    if (!patient)
      throw new NotFoundException(
        `No se encontró el paciente con código: ${codPatient}`,
      );
    assertCanAccess(actor, patient.user.cedUser, READERS);
    return patient;
  }
}
