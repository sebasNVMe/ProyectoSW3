import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity.js';
import { PatientController } from './controllers/patient.controller.js';
import { Patient } from './entities/patient.entity.js';
import { Professional } from './entities/professional.entity.js';
import { PatientService } from './services/patient.service.js';
import { ProfessionalController } from './controllers/professional.controller.js';
import { ProfessionalService } from './services/professional.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Patient, Professional, User])],
  controllers: [PatientController, ProfessionalController],
  providers: [PatientService, ProfessionalService],
})
export class PeopleModule {}
