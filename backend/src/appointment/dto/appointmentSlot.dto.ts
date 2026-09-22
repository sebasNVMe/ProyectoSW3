import { SpecialityProfEnum } from '../../people/enums/professional.enums.js';
import { TypeProfEnum } from '../../people/enums/professional.enums.js';

export class AppointmentSlotDto {
  codProf: number;
  codPatient?: number;
  dateApp: string;
  timeApp: string;
  descApp?: string;
  professionalName: string;
  typeProf: TypeProfEnum;
  specialityProf: SpecialityProfEnum;
}
