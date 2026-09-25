import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusUserEnum } from '../../auth/entities/user.entity.js';
import { RoleUserEnum } from '../../auth/enums/roleUser.enum.js';

export class CreatePatientDto {

  @IsNotEmpty() @IsNumber() cedUser: number;
  @IsDateString() dateBirthPatient: string | null;
}
