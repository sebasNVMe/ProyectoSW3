import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity.js';
import { AppointmentService } from './services/appointment.service.js';
import { FestivosService } from './services/festivos.service.js';
import { AppointmentController } from './controllers/appointment.controller.js';
import { PeopleModule } from '../people/people.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), PeopleModule],
  providers: [AppointmentService, FestivosService],
  controllers: [AppointmentController],
  exports: [TypeOrmModule],
})
export class AppointmentModule {}
