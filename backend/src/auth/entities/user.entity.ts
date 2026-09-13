import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RoleUserEnum } from '../enums/roleUser.enum.js';

export enum StatusUserEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  codUser: number;

  @Column()
  cedUser: number;

  @Column()
  nameUser: string;

  @Column()
  lastNameUser: string;

  @Column({
    type: 'enum',
    enum: StatusUserEnum,
    default: StatusUserEnum.ACTIVE,
  })
  statusUser: StatusUserEnum;

  @Column({ type: 'enum', enum: RoleUserEnum })
  roleUser: RoleUserEnum;

  @Column()
  passwordUser: string;

  @Column()
  phoneUser: string;

  @Column()
  genderUser: string;

  @Column({ nullable: true })
  securityQuestion: string;

  @Column({ nullable: true })
  securityAnswer: string;
}
