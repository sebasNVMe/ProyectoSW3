import { Navigate, Outlet } from "react-router-dom"
import { ROLE_HOME } from "../config/roles"
import { getToken, getRoleFromToken } from "../utils/session"

export default function PublicOnlyRoute() {
    const token = getToken()
    const role = getRoleFromToken()
    if (token && role) {
        return <Navigate to={ROLE_HOME[role]} replace />
    }
    return <Outlet />
}