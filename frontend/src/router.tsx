import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import AuthLayout from "./layout/AuthLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ScheduleAppointmentView from "./views/ScheduleAppointmentView";
import MyAppointmentsView from "./views/MyAppointmentsView";
import UserLayout from "./layout/UserLayout";
import SchedulerView from "./views/SchedulerView";
import SchedulerLayout from "./layout/SchedulerLayout";
import AdminLayout from "./layout/AdminLayout";
import AdminConfigView from "./views/AdminConfigView";
import AdminRegisterProfessionalView from "./views/AdminRegisterProfessionalView";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>
                <Route element={<UserLayout />}>
                    <Route path='/my-appointments' element={<MyAppointmentsView />} />
                    <Route path='/schedule-appointment' element={<ScheduleAppointmentView />} />
                </Route>
                <Route element={<SchedulerLayout />}>
                    <Route path='/scheduler' element={<SchedulerView />} />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path='/admin/config' element={<AdminConfigView />} />
                    <Route path='/admin/register-professional' element={<AdminRegisterProfessionalView />} />
                </Route>
                <Route path='/' element={<HomeView />} />
            </Routes>
        </BrowserRouter>
    )
}