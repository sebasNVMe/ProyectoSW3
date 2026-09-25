import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "../components/Header";

export default function SchedulerLayout() {
    return (
        <>
            <div className="bg-custom-light min-h-screen">
                <Header />
                <Outlet />
            </div>
            <Toaster position="top-right" />
        </>
    );
}
