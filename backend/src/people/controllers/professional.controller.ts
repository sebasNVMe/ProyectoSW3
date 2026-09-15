import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseEnumPipe, ParseIntPipe, Post, Put, Res } from '@nestjs/common';
import type { Response } from 'express';
import { CreateProfessionalDto } from '../dto/create-professional.dto.js';
import { UpdateProfessionalDto } from '../dto/update-professional.dto.js';
import { SpecialityProfEnum } from '../enums/professional.enums.js';
import { PeoplePresenter } from '../people.presenter.js';
import { ProfessionalService } from '../services/professional.service.js';

@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professionals: ProfessionalService) {}

  @Get()
  async findAll(@Res({ passthrough: true }) response: Response) {
    const professionals = await this.professionals.findAll();
    if (!professionals.length) { response.status(HttpStatus.NO_CONTENT); return; }
    return professionals.map(PeoplePresenter.professional);
  }

  @Get('user/:codUser')
  async findByCodUser(@Param('codUser', ParseIntPipe) codUser: number) {
    const professional = await this.professionals.findByCodUser(codUser);
    if (!professional) throw new NotFoundException(`No se encontró el profesional con codUser: ${codUser}`);
    return PeoplePresenter.professional(professional);
  }

  @Get('speciality/:speciality')
  async findBySpeciality(@Param('speciality', new ParseEnumPipe(SpecialityProfEnum)) speciality: SpecialityProfEnum, @Res({ passthrough: true }) response: Response) {
    const professionals = await this.professionals.findBySpeciality(speciality);
    if (!professionals.length) { response.status(HttpStatus.NO_CONTENT); return; }
    return professionals.map(PeoplePresenter.professional);
  }

  @Post()
  async register(@Body() dto: CreateProfessionalDto, @Res({ passthrough: true }) response: Response) {
    const professional = await this.professionals.register(dto);
    response.location(`/professionals/${professional.codProf}`);
    return PeoplePresenter.professional(professional);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProfessionalDto) {
    return this.professionals.update(id, dto).then(PeoplePresenter.professional);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deactivate(@Param('id', ParseIntPipe) id: number): Promise<void> { await this.professionals.deactivate(id); }

  @Get(':codigo')
  async findByCodigo(@Param('codigo', ParseIntPipe) codigo: number) {
    const professional = await this.professionals.findByCodProf(codigo);
    if (!professional) throw new NotFoundException(`No se encontró el profesional con codigo: ${codigo}`);
    return PeoplePresenter.professional(professional);
  }
}
