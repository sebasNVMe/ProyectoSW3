import { IsOptional, IsString, IsEnum, Matches } from 'class-validator';
import { StatusAppointment } from '../enums/statusAppointment.enum.js';

export class UpdateAppointmentDto {
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'dateApp debe tener formato YYYY-MM-DD',
  })
  dateApp?: string;

  @IsOptional()
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/, {
    message: 'timeApp debe tener formato HH:mm',
  })
  timeApp?: string;

  @IsOptional()
  @IsString()
  descApp?: string;

  @IsOptional()
  @IsEnum(StatusAppointment)
  statusApp?: StatusAppointment;
}
