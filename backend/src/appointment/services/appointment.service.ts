import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Appointment } from '../entities/appointment.entity.js';
import { StatusAppointment } from '../enums/statusAppointment.enum.js';
import { CreateAppointmentDto } from '../dto/createAppointment.dto.js';
import { UpdateAppointmentDto } from '../dto/updateAppointment.dto.js';
import { AppointmentSlotDto } from '../dto/appointmentSlot.dto.js';
import { FestivosService } from '../services/festivos.service.js';
import { ApiResponseDto } from '../../commons/dto/apiResponse.dto.js';
import { PatientService } from '../../people/services/patient.service.js';
import { ProfessionalService } from '../../people/services/professional.service.js';
import {
  addMinutes,
  isBefore,
  isAfter,
  parseUnavailableDays,
  getDayOfWeek,
  isWeekend,
} from '../../commons/utils/time.util.js';
import { SpecialityProfEnum } from '../../people/enums/professional.enums.js';
import { Professional } from '../../people/entities/professional.entity.js';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private patientService: PatientService,
    private professionalService: ProfessionalService,
    private festivosService: FestivosService,
  ) {}

  async create(
    dto: CreateAppointmentDto,
  ): Promise<ApiResponseDto<Appointment>> {
    const patient = await this.patientService.findByCodPatient(dto.codPatient);
    if (!patient) {
      throw new NotFoundException(
        `No existe el paciente con código: ${dto.codPatient}`,
      );
    }

    const professional = await this.professionalService.findByCodProf(
      dto.codProf,
    );
    if (!professional) {
      throw new NotFoundException(
        `No existe el profesional con código: ${dto.codProf}`,
      );
    }

    const scheduledExists = await this.appointmentRepository.findOneBy({
      patient: { codPatient: dto.codPatient },
      statusApp: StatusAppointment.SCHEDULED,
    });
    if (scheduledExists) {
      throw new ConflictException(
        'El paciente ya tiene una cita agendada. No puede agendar otra hasta que la cita actual sea completada o cancelada.',
      );
    }

    const appointment = this.appointmentRepository.create({
      professional,
      patient,
      dateApp: dto.dateApp,
      timeApp: dto.timeApp,
      descApp: dto.descApp,
      statusApp: StatusAppointment.SCHEDULED,
    });

    const saved = await this.appointmentRepository.save(appointment);
    return new ApiResponseDto('Cita agendada exitosamente', saved);
  }

  async findById(id: number): Promise<Appointment | null> {
    return this.appointmentRepository.findOne({
      where: { codApp: id },
      relations: { patient: true, professional: true },
    });
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      relations: { patient: true, professional: true },
    });
  }

  async findByCodProf(codProf: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { professional: { codProf } },
      relations: { patient: true, professional: true },
    });
  }

  async findByCodPatient(codPatient: number): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { patient: { codPatient } },
      relations: { patient: true, professional: true },
    });
  }

  async findByStatus(status: StatusAppointment): Promise<Appointment[]> {
    return this.appointmentRepository.findBy({ statusApp: status });
  }

  async findByCodProfAndDate(
    codProf: number,
    date: string,
  ): Promise<Appointment[]> {
    return this.appointmentRepository.find({
      where: { professional: { codProf }, dateApp: date },
      relations: { patient: true, professional: true },
    });
  }

  async findByDateApp(dateApp: string): Promise<Appointment[]> {
    return this.appointmentRepository.findBy({ dateApp });
  }

  async update(
    id: number,
    dto: UpdateAppointmentDto,
  ): Promise<ApiResponseDto<Appointment>> {
    const appointment = await this.appointmentRepository.findOneBy({
      codApp: id,
    });
    if (!appointment) {
      throw new NotFoundException(`Cita no encontrada con id: ${id}`);
    }

    if (dto.dateApp) appointment.dateApp = dto.dateApp;
    if (dto.timeApp) appointment.timeApp = dto.timeApp;
    if (dto.descApp !== undefined) appointment.descApp = dto.descApp;
    if (dto.statusApp) appointment.statusApp = dto.statusApp;

    const saved = await this.appointmentRepository.save(appointment);
    return new ApiResponseDto('Cita actualizada exitosamente', saved);
  }

  async cancel(id: number): Promise<ApiResponseDto<null>> {
    const appointment = await this.appointmentRepository.findOneBy({
      codApp: id,
    });
    if (!appointment) {
      throw new NotFoundException(`No se encontró la cita con id: ${id}`);
    }
    appointment.statusApp = StatusAppointment.CANCELLED;
    await this.appointmentRepository.save(appointment);
    return new ApiResponseDto('Cita cancelada exitosamente', null);
  }

  async generateAvailableSlots(
    codProf?: number,
    date?: string,
    speciality?: SpecialityProfEnum,
  ): Promise<AppointmentSlotDto[]> {
    const targetDate = date ?? new Date().toISOString().slice(0, 10);
    const now = new Date().toTimeString().slice(0, 8);
    const availableSlots: AppointmentSlotDto[] = [];

    let professionals: Professional[];
    if (codProf) {
      const prof = await this.professionalService.findByCodProf(codProf);
      professionals = prof ? [prof] : [];
    } else if (speciality) {
      professionals =
        await this.professionalService.findBySpeciality(speciality);
    } else {
      professionals = await this.professionalService.findAll();
    }

    const occupied = await this.appointmentRepository.find({
      where: {
        dateApp: targetDate,
        statusApp: Not(StatusAppointment.CANCELLED),
      },
      relations: { professional: true },
    });
    const busyKeys = new Set(
      occupied.map((a) => `${a.professional.codProf}-${a.timeApp}`),
    );

    const isToday = targetDate === new Date().toISOString().slice(0, 10);

    for (const prof of professionals) {
      const profStart = prof.arrivalTime ?? '07:00:00';
      const profEnd = prof.departureTime ?? '18:00:00';
      const interval =
        prof.attentionInterval && prof.attentionInterval > 0
          ? prof.attentionInterval
          : 30;

      if (
        parseUnavailableDays(prof.unavailableDays).includes(
          getDayOfWeek(targetDate),
        )
      )
        continue;

      let currentTime = profStart;
      while (!isAfter(addMinutes(currentTime, interval), profEnd)) {
        if (isToday && !isAfter(currentTime, now)) {
          currentTime = addMinutes(currentTime, interval);
          continue;
        }
        const key = `${prof.codProf}-${currentTime}`;
        if (!busyKeys.has(key)) {
          availableSlots.push({
            codProf: prof.codProf,
            dateApp: targetDate,
            timeApp: currentTime,
            professionalName: `${prof.user.nameUser} ${prof.user.lastNameUser}`,
            specialityProf: prof.specialityProf,
            typeProf: prof.typeProf,
          });
        }
        currentTime = addMinutes(currentTime, interval);
      }
    }
    return availableSlots;
  }

  async findFirstAvailableBySpeciality(speciality: SpecialityProfEnum): Promise<AppointmentSlotDto | null> {
    let dateSearch = new Date();
    const limitDate = new Date();
    limitDate.setDate(limitDate.getDate() + 60);

    while (dateSearch < limitDate) {
      const dateStr = dateSearch.toISOString().slice(0, 10);

      if (isWeekend(dateStr) || this.festivosService.esFestivo(dateStr)) {
        dateSearch.setDate(dateSearch.getDate() + 1);
        continue;
      }

      const professionals = await this.professionalService.findBySpeciality(speciality);

      const occupied = await this.appointmentRepository.find({
        where: { dateApp: dateStr, statusApp: Not(StatusAppointment.CANCELLED) },
        relations: { professional: true },
      });
      const busyKeys = new Set(occupied.map((a) => `${a.professional.codProf}-${a.timeApp}`));

      const now = new Date().toTimeString().slice(0, 8);
      const isToday = dateStr === new Date().toISOString().slice(0, 10);

      for (const prof of professionals) {
        if (parseUnavailableDays(prof.unavailableDays).includes(getDayOfWeek(dateStr))) continue;

        const interval = prof.attentionInterval && prof.attentionInterval > 0 ? prof.attentionInterval : 30;
        let currentTime = prof.arrivalTime ?? '07:00:00';
        const endDay = prof.departureTime ?? '18:00:00';

        while (!isAfter(addMinutes(currentTime, interval), endDay)) {
          if (isToday && isBefore(currentTime, now)) {
            currentTime = addMinutes(currentTime, interval);
            continue;
          }
          const key = `${prof.codProf}-${currentTime}`;
          if (!busyKeys.has(key)) {
            return {
              codProf: prof.codProf,
              dateApp: dateStr,
              timeApp: currentTime,
              professionalName: `${prof.user.nameUser} ${prof.user.lastNameUser}`,
              specialityProf: prof.specialityProf,
              typeProf: prof.typeProf,
            };
          }
          currentTime = addMinutes(currentTime, interval);
        }
      }
      dateSearch.setDate(dateSearch.getDate() + 1);
    }
    return null;
  }
}
