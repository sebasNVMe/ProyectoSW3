/*import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { getSession } from "../utils/session";

export default function AdminNavigation() {
    const location = useLocation();
    const name = getSession()?.user.nameUser ?? "Administrador";

    return (
        <div className="flex items-center gap-6">
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
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-xs text-slate-400 leading-none">
                        Bienvenido,
                    </p>
                    <p className="text-sm font-semibold text-white leading-tight">
                        {name}
                    </p>
                </div>
            </div>
            <LogoutButton className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white border border-gray-600 transition-colors" />
        </div>
    );
}*/

import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { getSession } from "../utils/session";

export default function AdminNavigation() {
    const location = useLocation();
    const name = getSession()?.user.nameUser ?? "Administrador";

    return (
        <div className="flex items-center gap-6">
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
            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-xs text-slate-400 leading-none">
                        Bienvenido,
                    </p>
                    <p className="text-sm font-semibold text-white leading-tight">
                        {name}
                    </p>
                </div>
            </div>
            <LogoutButton className="px-4 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white border border-gray-600 transition-colors" />
        </div>
    );
}