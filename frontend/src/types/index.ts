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
