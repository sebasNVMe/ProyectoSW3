import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseEnumPipe, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CreateProfessionalDto } from '../dto/create-professional.dto.js';
import { UpdateProfessionalDto } from '../dto/update-professional.dto.js';
import { SpecialityProfEnum } from '../enums/professional.enums.js';
import { ProfessionalService } from '../services/professional.service.js';
import { Professional } from '../entities/professional.entity.js';

@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professionals: ProfessionalService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) response: Response): Promise <Professional[]> {
    const professionals = await this.professionals.findAll();
    if (!professionals.length) { response.status(HttpStatus.NO_CONTENT); return []; }
    return professionals;
  }

  @Get('user/:codUser')
  async findByCodUser(@Param('codUser', ParseIntPipe) codUser: number): Promise<Professional> {
    const professional = await this.professionals.findByCedUser(codUser);
    if (!professional) throw new NotFoundException(`No se encontró el profesional con codUser: ${codUser}`);
    return professional;
  }

  @Get('speciality/:speciality')
  async findBySpeciality(@Param('speciality', new ParseEnumPipe(SpecialityProfEnum)) speciality: SpecialityProfEnum, @Res({ passthrough: true }) response: Response): Promise<Professional[]> {
    const professionals = await this.professionals.findBySpeciality(speciality);
    if (!professionals.length) { response.status(HttpStatus.NO_CONTENT); return []; }
    return professionals;
  }

  @Post()
  async register(@Body() dto: CreateProfessionalDto, @Res({ passthrough: true }) response: Response): Promise<Professional> {
    const professional = await this.professionals.register(dto);
    response.location(`/professionals/${professional.codProf}`);
    return professional;
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProfessionalDto): Promise<Professional> {
    return this.professionals.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deactivate(@Param('id', ParseIntPipe) id: number): Promise<void> { await this.professionals.deactivate(id); }

  @Get(':codigo')
  async findByCodigo(@Param('codigo', ParseIntPipe) codigo: number): Promise<Professional> {
    const professional = await this.professionals.findByCodProf(codigo);
    if (!professional) throw new NotFoundException(`No se encontró el profesional con codigo: ${codigo}`);
    return professional;
  }
}
