import { Outlet, Link, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

export default function AdminLayout() {
    const location = useLocation();

    return (
        <>
            <div className="bg-custom-light min-h-screen font-sans">
                {/* Admin Header */}
                <header className="bg-custom-dark text-white py-3 shadow-md sticky top-0 z-50">
                    <div className="mx-auto px-6 lg:px-8 flex items-center justify-between">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold tracking-wide">Piedrazul Admin</h1>
                        </div>

                        {/* Navigation */}
                        <nav className="flex items-center gap-6">
                            <Link
                                to="/admin/config"
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.includes('/config') ? 'bg-[#4f46e5] text-white' : 'text-gray-300 hover:text-white'}`}
                            >
                                Configuración
                            </Link>
                            <Link
                                to="/admin/register-professional"
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.includes('/register-professional') ? 'bg-[#4f46e5] text-white' : 'text-gray-300 hover:text-white'}`}
                            >
                                Registrar Profesional
                            </Link>
                        </nav>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-6 lg:px-8 py-8">
                    <Outlet />
                </main>
            </div>
            <Toaster position="top-right" />
        </>
    );
}
