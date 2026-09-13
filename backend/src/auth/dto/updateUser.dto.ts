import { IsOptional, IsString, IsEnum } from 'class-validator';
import { StatusUserEnum } from '../entities/user.entity.js';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  passwordUser?: string;

  @IsOptional()
  @IsString()
  nameUser?: string;

  @IsOptional()
  @IsString()
  lastNameUser?: string;

  @IsOptional()
  @IsString()
  phoneUser?: string;

  @IsOptional()
  @IsString()
  genderUser?: string;

  @IsOptional()
  @IsString()
  securityQuestion?: string;

  @IsOptional()
  @IsString()
  securityAnswer?: string;

  @IsOptional()
  @IsEnum(StatusUserEnum)
  statusUser?: StatusUserEnum;
}
