import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity.js';
import { SpecialityProfEnum, TypeProfEnum } from '../enums/professional.enums.js';

@Entity('professionals')
export class Professional{
  @PrimaryGeneratedColumn()
  codProf: number;

  @OneToOne(() => User, {nullable: true})
  @JoinColumn({name: 'codUser'})
  user: User;

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

  @Column({ type: 'varchar', nullable: true })
  unavailableDays: string | null;
  
}
