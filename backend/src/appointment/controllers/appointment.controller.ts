import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service.js';
import { CreateAppointmentDto } from '../dto/createAppointment.dto.js';
import { UpdateAppointmentDto } from '../dto/updateAppointment.dto.js';
import { StatusAppointment } from '../enums/statusAppointment.enum.js';
import { SpecialityProfEnum } from '../../people/enums/professional.enums.js';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get('generated')
  getGeneratedAppointments(
    @Query('codProf') codProf?: string,
    @Query('date') date?: string,
    @Query('speciality') speciality?: SpecialityProfEnum,
  ) {
    return this.appointmentService.generateAvailableSlots(
      codProf ? Number(codProf) : undefined,
      date,
      speciality,
    );
  }

  @Get('generated/speciality/:speciality')
  generateBySpeciality(@Param('speciality') speciality: SpecialityProfEnum) {
    return this.appointmentService.generateAvailableSlots(
      undefined,
      undefined,
      speciality,
    );
  }

  @Get('first-available/:speciality')
  findFirstAvailable(@Param('speciality') speciality: SpecialityProfEnum) {
    return this.appointmentService.findFirstAvailableBySpeciality(speciality);
  }

  @Get('professional/:codProf')
  findByCodProf(@Param('codProf', ParseIntPipe) codProf: number) {
    return this.appointmentService.findByCodProf(codProf);
  }

  @Get('patient/:codPatient')
  findByCodPatient(@Param('codPatient', ParseIntPipe) codPatient: number) {
    return this.appointmentService.findByCodPatient(codPatient);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: StatusAppointment) {
    return this.appointmentService.findByStatus(status);
  }

  @Get('professional/:codProf/date/:date')
  findByCodProfAndDate(
    @Param('codProf', ParseIntPipe) codProf: number,
    @Param('date') date: string,
  ) {
    return this.appointmentService.findByCodProfAndDate(codProf, date);
  }

  @Get('date/:date')
  findByDate(@Param('date') date: string) {
    return this.appointmentService.findByDateApp(date);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, dto);
  }

  @Put(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('statusApp') statusApp: StatusAppointment,
  ) {
    return this.appointmentService.update(id, { statusApp });
  }

  @Delete(':id')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.cancel(id);
  }
}
