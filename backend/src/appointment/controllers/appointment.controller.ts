import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AppointmentService } from '../services/appointment.service.js';
import { CreateAppointmentDto } from '../dto/createAppointment.dto.js';
import { UpdateAppointmentDto } from '../dto/updateAppointment.dto.js';
import { StatusAppointment } from '../enums/statusAppointment.enum.js';
import { SpecialityProfEnum } from '../../people/enums/professional.enums.js';
import { Auth } from '../../auth/decorators/auth.decorator.js';
import { RoleUserEnum } from '../../auth/enums/roleUser.enum.js';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.SCHEDULER, RoleUserEnum.PROFESSIONAL)
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Auth()
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

  @Auth()
  @Get('generated/speciality/:speciality')
  generateBySpeciality(@Param('speciality') speciality: SpecialityProfEnum) {
    return this.appointmentService.generateAvailableSlots(
      undefined,
      undefined,
      speciality,
    );
  }

  @Auth()
  @Get('first-available/:speciality')
  findFirstAvailable(@Param('speciality') speciality: SpecialityProfEnum) {
    return this.appointmentService.findFirstAvailableBySpeciality(speciality);
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.SCHEDULER, RoleUserEnum.PROFESSIONAL)
  @Get('professional/:codProf')
  findByCodProf(@Param('codProf', ParseIntPipe) codProf: number) {
    return this.appointmentService.findByCodProf(codProf);
  }

  @Auth()
  @Get('patient/:codPatient')
  findByCodPatient(@Param('codPatient', ParseIntPipe) codPatient: number) {
    return this.appointmentService.findByCodPatient(codPatient);
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.SCHEDULER, RoleUserEnum.PROFESSIONAL)
  @Get('status/:status')
  findByStatus(@Param('status') status: StatusAppointment) {
    return this.appointmentService.findByStatus(status);
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.SCHEDULER, RoleUserEnum.PROFESSIONAL)
  @Get('professional/:codProf/date/:date')
  findByCodProfAndDate(
    @Param('codProf', ParseIntPipe) codProf: number,
    @Param('date') date: string,
  ) {
    return this.appointmentService.findByCodProfAndDate(codProf, date);
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.SCHEDULER, RoleUserEnum.PROFESSIONAL)
  @Get('date/:date')
  findByDate(@Param('date') date: string) {
    return this.appointmentService.findByDateApp(date);
  }

  @Auth()
  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.findById(id);
  }

  @Auth()
  @Post()
  create(@Body() dto: CreateAppointmentDto) {
    return this.appointmentService.create(dto);
  }

  @Auth()
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, dto);
  }

  @Auth(RoleUserEnum.ADMIN, RoleUserEnum.SCHEDULER, RoleUserEnum.PROFESSIONAL)
  @Put(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('statusApp') statusApp: StatusAppointment,
  ) {
    return this.appointmentService.update(id, { statusApp });
  }

  @Auth()
  @Delete(':id')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.appointmentService.cancel(id);
  }
}
