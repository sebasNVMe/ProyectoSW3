import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseEnumPipe, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CreateProfessionalDto } from '../dto/create-professional.dto.js';
import { UpdateProfessionalDto } from '../dto/update-professional.dto.js';
import { SpecialityProfEnum } from '../enums/professional.enums.js';
import { ProfessionalService } from '../services/professional.service.js';
import { Professional } from '../entities/professional.entity.js';
import { Auth } from '../../auth/decorators/auth.decorator.js';
import { RoleUserEnum } from '../../auth/enums/roleUser.enum.js';

@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professionals: ProfessionalService) {}

  @Auth()
  @Get()
  async findAll(
    @Res({ passthrough: true }) response: Response,
  ): Promise<Professional[]> {
    const professionals = await this.professionals.findAll();
    if (!professionals.length) {
      response.status(HttpStatus.NO_CONTENT);
      return [];
    }
    return professionals;
  }

  @Auth()
  @Get('user/:codUser')
  async findByCodUser(
    @Param('codUser', ParseIntPipe) codUser: number,
  ): Promise<Professional> {
    const professional = await this.professionals.findByCedUser(codUser);
    if (!professional)
      throw new NotFoundException(
        `No se encontró el profesional con codUser: ${codUser}`,
      );
    return professional;
  }

  @Auth()
  @Get('speciality/:speciality')
  async findBySpeciality(
    @Param('speciality', new ParseEnumPipe(SpecialityProfEnum))
    speciality: SpecialityProfEnum,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Professional[]> {
    const professionals = await this.professionals.findBySpeciality(speciality);
    if (!professionals.length) {
      response.status(HttpStatus.NO_CONTENT);
      return [];
    }
    return professionals;
  }

  @Auth(RoleUserEnum.ADMIN)
  @Post()
  async register(
    @Body() dto: CreateProfessionalDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Professional> {
    const professional = await this.professionals.register(dto);
    response.location(`/professionals/${professional.codProf}`);
    return professional;
  }

  @Auth(RoleUserEnum.ADMIN)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProfessionalDto,
  ): Promise<Professional> {
    return this.professionals.update(id, dto);
  }

  @Auth(RoleUserEnum.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deactivate(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.professionals.deactivate(id);
  }

  @Auth()
  @Get(':codigo')
  async findByCodigo(
    @Param('codigo', ParseIntPipe) codigo: number,
  ): Promise<Professional> {
    const professional = await this.professionals.findByCodProf(codigo);
    if (!professional)
      throw new NotFoundException(
        `No se encontró el profesional con codigo: ${codigo}`,
      );
    return professional;
  }
}
