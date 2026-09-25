import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';
import { SpecialityProfEnum, TypeProfEnum } from '../enums/professional.enums.js';
import { User } from '../../auth/entities/user.entity.js';

export class CreateProfessionalDto {



  @IsNotEmpty() @IsNumber() cedUser: number;
  
  @IsEnum(TypeProfEnum) typeProf: TypeProfEnum;
  @IsEnum(SpecialityProfEnum) specialityProf: SpecialityProfEnum;
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/) arrivalTime: string;
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/) departureTime: string;
  @IsNumber() attentionInterval: number;
  @IsOptional() @IsString() unavailableDays?: string;
}
