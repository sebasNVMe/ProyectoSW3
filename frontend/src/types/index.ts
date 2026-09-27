export type User = {
    codUser: number
    cedUser: number
    nameUser: string
    lastNameUser: string
    statusUser: string
    roleUser: string
    passwordUser: string
    phoneUser: string
    genderUser: string
    securityQuestion: string
    securityAnswer: string
}

export type Patient = {
    codPatient: number
    user: User
    dateBirthPatient: string | null
}

export type Professional = {
    codProf: number
    user: User
    typeProf: string
    specialityProf: string
    arrivalTime: string
    departureTime: string
    attentionInterval: number
    unavailableDays: string | null
}

export type LoginForm = Pick<User, 'cedUser'> & {
    password: string
}

export type RegisterForm = Pick<User, 'cedUser' | 'nameUser' | 'lastNameUser' | 'roleUser' | 'phoneUser' | 'genderUser'> & {
    passwordUser: string
}

export type RegisterProffesionalForm = Pick<Professional, 'user' | 'typeProf' | 'specialityProf' | 'arrivalTime' | 'departureTime' | 'attentionInterval'> & {
    passwordUser: string
}

export type LoginResponse = {
    token: string;
    role: string;
    codUser: number;
    cedUser: number;
    nameUser: string;
}

export const SpecialityProfEnum = {
    Neural_Therapy: 'Neural_Therapy',
    Chiropractor: 'Chiropractor',
    Physiotherapy: 'Physiotherapy',
    General: 'General',
} as const;

export type SpecialityProfEnum = (typeof SpecialityProfEnum)[keyof typeof SpecialityProfEnum];

export type Specialty = {
    value: SpecialityProfEnum
    label: string
    description: string
}

export type AppointmentSlot = {
    codProf: number
    dateApp: string
    timeApp: string
    professionalName: string
    specialityProf: string
    typeProf: string
}

export type CreateAppointmentPayload = {
    codProf: number
    codPatient: number
    dateApp: string
    timeApp: string
    descApp?: string
}

export const StatusAppointment = {
    SCHEDULED: 'SCHEDULED',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    RESCHEDULED: 'RESCHEDULED',
} as const

export type StatusAppointment = (typeof StatusAppointment)[keyof typeof StatusAppointment]

export type Appointment = {
    codApp: number
    professional: Professional
    patient: Patient
    dateApp: string
    timeApp: string
    descApp?: string
    statusApp: StatusAppointment
}

export type AppointmentRow = {
    formattedTime: string;
    patientName: string;
    patientCed: string;
    profName: string;
    specialityLabel: string;
    specialityStyle: string;
    statusLabel: string;
    statusDotColor: string;
    statusTextColor: string;
    isActive: boolean;
};