import { Patient } from './entities/patient.entity.js';
import { Professional } from './entities/professional.entity.js';

/** Converts persistence entities into the JSON shape exposed by Spring Boot. */
export class PeoplePresenter {
  static patient(patient: Patient) {
    return {
      ...patient,
      phonePatient: patient.phonePatient === null ? null : Number(patient.phonePatient),
    };
  }

  static professional(professional: Professional) {
    const { user, ...fields } = professional;
    return {
      ...fields,
      userRef: {
        codUser: user.codUser,
        cedUser: user.cedUser,
        nameUser: user.nameUser,
        lastNameUser: user.lastNameUser,
        roleUser: user.roleUser,
      },
    };
  }
}
