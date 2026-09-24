import { IsEnum, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { SpecialityProfEnum, TypeProfEnum } from '../enums/professional.enums.js';

export class UpdateProfessionalDto {
  @IsOptional() @IsString() genderUser?: string;
  @IsOptional() @IsString() phoneUser?: string;
  @IsOptional() @IsEnum(TypeProfEnum) typeProf?: TypeProfEnum;
  @IsOptional() @IsEnum(SpecialityProfEnum) specialityProf?: SpecialityProfEnum;
  @IsOptional() @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/) arrivalTime?: string;
  @IsOptional() @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/) departureTime?: string;
  @IsOptional() @IsNumber() attentionInterval?: number;
  @IsOptional() @IsString() unavailableDays?: string;
}
