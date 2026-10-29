export const ROLES = {
    ADMIN: "ADMIN",
    PROFESSIONAL: "PROFESSIONAL",
    PATIENT: "PATIENT",
    SCHEDULER: "SCHEDULER",
} as const

export type Role = (typeof ROLES)[keyof typeof ROLES]

// Pantalla a la que va cada rol al iniciar sesión
export const ROLE_HOME: Record<Role, string> = {
    PATIENT: "/schedule-appointment",
    SCHEDULER: "/scheduler",
    ADMIN: "/admin/config",
    PROFESSIONAL: "/scheduler",
}