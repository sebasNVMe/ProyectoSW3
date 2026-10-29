import { ROLES, type Role } from "../config/roles"

export type StoredUser = {
    role: Role
    codUser: number
    cedUser: number
    nameUser: string
}

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
    localStorage.removeItem("AUTH_USER")
}

export function getSession(): { token: string; user: StoredUser } | null {
    const token = localStorage.getItem("AUTH_TOKEN")
    const rawUser = localStorage.getItem("AUTH_USER")
    if (!token || !rawUser) return null

    if (isTokenExpired(token)) {
        clearSession()
        return null
    }

    try {
        const user = JSON.parse(rawUser) as StoredUser
        if (!Object.values(ROLES).includes(user.role)) {
            clearSession()
            return null
        }
        return { token, user }
    } catch {
        clearSession()
        return null
    }
}