import { Navigate, Outlet } from "react-router-dom"
import { ROLE_HOME } from "../config/roles"
import { getSession } from "../utils/session"

export default function PublicOnlyRoute() {
    const session = getSession()
    if (session) {
        return <Navigate to={ROLE_HOME[session.user.role]} replace />
    }
    return <Outlet />
}