import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity.js';
import { SpecialityProfEnum, StatusProfEnum, TypeProfEnum } from '../enums/professional.enums.js';

@Entity('professionals')
export class Professional {
  @PrimaryGeneratedColumn()
  codProf: number;

  /** The user remains owned by Auth; this is the former USER_REF relation. */
  @ManyToOne(() => User, { eager: true, nullable: false })
  @JoinColumn({ name: 'codUser' })
  user: User;

  @Column()
  genProf: string;

  @Column({ nullable: true })
  phoneProf: string | null;

  @Column({ type: 'enum', enum: StatusProfEnum, default: StatusProfEnum.Active })
  statusProf: StatusProfEnum;

  @Column({ type: 'enum', enum: TypeProfEnum })
  typeProf: TypeProfEnum;

  @Column({ type: 'enum', enum: SpecialityProfEnum })
  specialityProf: SpecialityProfEnum;

  @Column({ type: 'time' })
  arrivalTime: string;

  @Column({ type: 'time' })
  departureTime: string;

  @Column()
  attentionInterval: number;

  @Column({ nullable: true })
  unavailableDays: string | null;
}
