import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { RoleUserEnum } from '../enums/roleUser.enum.js';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsNumber()
  cedUser: number;

  @IsNotEmpty()
  @IsString()
  passwordUser: string;

  @IsNotEmpty()
  @IsString()
  nameUser: string;

  @IsNotEmpty()
  @IsString()
  lastNameUser: string;

  @IsNotEmpty()
  @IsEnum(RoleUserEnum)
  roleUser: RoleUserEnum;

  @IsNotEmpty()
  @IsString()
  phoneUser: string;

  @IsNotEmpty()
  @IsString()
  genderUser: string;

  @IsOptional()
  @IsString()
  securityQuestion?: string;

  @IsOptional()
  @IsString()
  securityAnswer?: string;
}
