import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty()
  @IsNumber()
  cedUser: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}
