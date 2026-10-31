import { ROLES, type Role } from "../config/roles"

function isTokenExpired(token: string): boolean {
    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
        const payload = JSON.parse(atob(base64))
        return typeof payload.exp === "number" && payload.exp * 1000 < Date.now()
    } catch {
        return true
    }
}

export function clearSession() {
    localStorage.removeItem("AUTH_TOKEN")
}

/**
 * Verifica si existe un token JWT válido (no expirado).
 * Ya no se almacena información del usuario en localStorage;
 * esa responsabilidad la tiene el hook useUser con React Query.
 */
export function getToken(): string | null {
    const token = localStorage.getItem("AUTH_TOKEN")
    if (!token) return null

    if (isTokenExpired(token)) {
        clearSession()
        return null
    }

    return token
}

/**
 * Decodifica el rol del usuario directamente desde el JWT,
 * sin necesidad de almacenar datos del usuario en localStorage.
 * Útil en componentes síncronos que solo necesitan el rol (rutas protegidas).
 */
export function getRoleFromToken(): Role | null {
    const token = localStorage.getItem("AUTH_TOKEN")
    if (!token) return null

    if (isTokenExpired(token)) {
        clearSession()
        return null
    }

    try {
        const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
        const payload = JSON.parse(atob(base64))
        // Keycloak guarda los roles en realm_access.roles
        const roles: string[] = payload.realm_access?.roles ?? []
        const validRoles = Object.values(ROLES) as string[]
        const matchedRole = roles.find(r => validRoles.includes(r))
        return (matchedRole as Role) ?? null
    } catch {
        clearSession()
        return null
    }
}