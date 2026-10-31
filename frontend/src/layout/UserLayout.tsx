import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import Header from '../components/Header'
import SchedulerNavigation from '../components/SchedulerNavigation'
import { ROLES } from '../config/roles'
import { getRoleFromToken } from '../utils/session'

export default function UserLayout() {
    const role = getRoleFromToken()
    const usesSchedulerMenu = role === ROLES.SCHEDULER || role === ROLES.PROFESSIONAL

    return (
        <>
            <div className="bg-custom-light min-h-screen">
                <Header navigation={usesSchedulerMenu ? <SchedulerNavigation /> : undefined} />
                <Outlet />
            </div>
            <Toaster position="top-right" />
        </>
    )
}
