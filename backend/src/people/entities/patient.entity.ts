import { Column, Entity, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';
import {User} from '../../auth/entities/user.entity.js';

@Entity('patients')
export class Patient{

  @PrimaryGeneratedColumn()
  codPatient: number;

  @OneToOne(() => User, {nullable: true})
  @JoinColumn({name: 'codUser'})
  user: User;

  @Column({ nullable: true, type: 'date' })
  dateBirthPatient: string | null;

}
