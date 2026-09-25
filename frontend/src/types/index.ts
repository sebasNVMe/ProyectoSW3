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

export type LoginForm = Pick<User, 'cedUser'> & {
    password: string
}

export type RegisterForm = Pick<User, 'cedUser' | 'nameUser' | 'lastNameUser' | 'roleUser' | 'phoneUser' | 'genderUser'> & {
    passwordUser: string
}

