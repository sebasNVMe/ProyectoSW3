import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePatientDto {
  @IsOptional() @IsString() nameUser?: string;
  @IsOptional() @IsString() lastNameUser?: string;
  @IsOptional() @IsNumber() phoneUser?: number;
  @IsOptional() @IsDateString() dateBirthPatient?: string;
  @IsOptional() @IsString() genderUser?: string;
}
