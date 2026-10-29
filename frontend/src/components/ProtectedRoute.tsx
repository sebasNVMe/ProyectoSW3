import { Navigate, Outlet, useLocation } from "react-router-dom"
import { ROLE_HOME, type Role } from "../config/roles"
import { getSession } from "../utils/session"

type Props = { allowedRoles: Role[] }

export default function ProtectedRoute({ allowedRoles }: Props) {
    const session = getSession()
    const location = useLocation()

    if (!session) {
        return <Navigate to="/auth/login" replace state={{ from: location }} />
    }
    if (!allowedRoles.includes(session.user.role)) {
        const home = ROLE_HOME[session.user.role]
        // Si la pantalla de inicio del rol tampoco le está permitida, evita el bucle
        if (home === location.pathname) {
            return <Navigate to="/" replace />
        }
        return <Navigate to={home} replace />
    }
    return <Outlet />
}