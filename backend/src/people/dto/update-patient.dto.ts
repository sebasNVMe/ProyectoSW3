import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePatientDto {
  @IsOptional() @IsString() namePatient?: string;
  @IsOptional() @IsString() secondNamePatient?: string;
  @IsOptional() @IsString() lastNamePatient?: string;
  @IsOptional() @IsString() secondLastNamePatient?: string;
  @IsOptional() @IsNumber() phonePatient?: number;
  @IsOptional() @IsDateString() dateBirthPatient?: string;
  @IsOptional() @IsString() genderPatient?: string;
}
