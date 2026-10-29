import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ROLES } from "./config/roles";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicOnlyRoute from "./components/PublicOnlyRoute";
import HomeView from "./views/HomeView";
import AuthLayout from "./layout/AuthLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ScheduleAppointmentView from "./views/ScheduleAppointmentView";
import MyAppointmentsView from "./views/MyAppointmentsView";
import UserLayout from "./layout/UserLayout";
import SchedulerView from "./views/SchedulerView";
import AdminLayout from "./layout/AdminLayout";
import AdminConfigView from "./views/AdminConfigView";
import AdminRegisterProfessionalView from "./views/AdminRegisterProfessionalView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicOnlyRoute />}>
                    <Route element={<AuthLayout />}>
                        <Route path='/auth/login' element={<LoginView />} />
                        <Route path='/auth/register' element={<RegisterView />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute allowedRoles={[ROLES.PATIENT]} />}>
                    <Route element={<UserLayout />}>
                        <Route path='/my-appointments' element={<MyAppointmentsView />} />
                        <Route path='/schedule-appointment' element={<ScheduleAppointmentView />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute allowedRoles={[ROLES.SCHEDULER, ROLES.PROFESSIONAL]} />}>
                    <Route element={<UserLayout />}>
                        <Route path='/scheduler' element={<SchedulerView />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
                    <Route element={<AdminLayout />}>
                        <Route path='/admin/config' element={<AdminConfigView />} />
                        <Route path='/admin/register-professional' element={<AdminRegisterProfessionalView />} />
                    </Route>
                </Route>

                <Route path='/' element={<HomeView />} />
                <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
        </BrowserRouter>
    )
}