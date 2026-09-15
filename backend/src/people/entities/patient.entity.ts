import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('patients')
export class Patient {
  @PrimaryGeneratedColumn()
  codPatient: number;

  @Index({ unique: true })
  @Column()
  idPatient: number;

  @Column()
  namePatient: string;

  @Column({ nullable: true })
  secondNamePatient: string | null;

  @Column()
  lastNamePatient: string;

  @Column({ nullable: true })
  secondLastNamePatient: string | null;

  @Column({ nullable: true, type: 'bigint' })
  phonePatient: string | null;

  @Column({ nullable: true, type: 'date' })
  dateBirthPatient: string | null;

  @Column()
  genderPatient: string;
}
