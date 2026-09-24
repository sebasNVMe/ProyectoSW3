import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import AuthLayout from "./layout/AuthLayout";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ScheduleAppointmentView from "./views/ScheduleAppointmentView";
import UserLayout from "./layout/UserLayout";


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<LoginView />} />
                    <Route path='/auth/register' element={<RegisterView />} />
                </Route>
                <Route element={<UserLayout />}>
                    <Route path='/schedule-appointment' element={< ScheduleAppointmentView />} />
                </Route>
                <Route path='/' element={<HomeView />} />
            </Routes>
        </BrowserRouter>
    )
}