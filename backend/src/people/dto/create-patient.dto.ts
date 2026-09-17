import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePatientDto {
  @IsNumber()
  idPatient: number;

  @IsString()
  @IsNotEmpty()
  namePatient: string;

  @IsOptional()
  @IsString()
  secondNamePatient?: string;

  @IsString()
  @IsNotEmpty()
  lastNamePatient: string;

  @IsOptional()
  @IsString()
  secondLastNamePatient?: string;

  @IsOptional()
  @IsNumber()
  phonePatient?: number;

  @IsOptional()
  @IsDateString()
  dateBirthPatient?: string;

  @IsString()
  @IsNotEmpty()
  genderPatient: string;
}
