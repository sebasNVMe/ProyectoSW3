import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty({ message: 'el código del profesional es obligatorio' })
  @IsNumber()
  codProf: number;

  @IsNotEmpty({ message: 'el código del paciente es obligatorio' })
  @IsNumber()
  codPatient: number;

  @IsNotEmpty({ message: 'la fecha es obligatoria' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'dateApp debe tener formato YYYY-MM-DD',
  })
  dateApp: string;

  @IsNotEmpty({ message: 'la hora es obligatoria' })
  @Matches(/^\d{2}:\d{2}(:\d{2})?$/, {
    message: 'timeApp debe tener formato HH:mm',
  })
  timeApp: string;

  @IsOptional()
  @IsString()
  descApp?: string;
}
