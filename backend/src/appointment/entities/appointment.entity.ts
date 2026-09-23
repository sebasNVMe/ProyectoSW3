import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StatusAppointment } from '../enums/statusAppointment.enum.js';
import { Patient } from '../../people/entities/patient.entity.js';
import { Professional } from '../../people/entities/professional.entity.js';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn()
  codApp: number;

  @ManyToOne(() => Professional, { nullable: false })
  @JoinColumn({ name: 'codProf' })
  professional: Professional;

  @ManyToOne(() => Patient, { nullable: false })
  @JoinColumn({ name: 'codPatient' })
  patient: Patient;

  @Column({ type: 'date' })
  dateApp: string;

  @Column({ type: 'time' })
  timeApp: string;

  @Column({ nullable: true })
  descApp: string;

  @Column({
    type: 'enum',
    enum: StatusAppointment,
    default: StatusAppointment.SCHEDULED,
  })
  statusApp: StatusAppointment;
}
