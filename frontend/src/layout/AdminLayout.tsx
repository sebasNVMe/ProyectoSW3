import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import Header from "../components/Header";
import AdminNavigation from "../components/AdminNavigation";

export default function AdminLayout() {
    return (
        <>
            <div className="bg-custom-light min-h-screen font-sans">
                <Header
                    navigation={<AdminNavigation />}
                    className="bg-custom-dark text-white py-3 shadow-md sticky top-0 z-50"
                    logoSrc="/logo-blanco.svg"
                />

                <main className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
                    <Outlet />
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    );
}


