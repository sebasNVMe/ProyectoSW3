import { Link, useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { getSession } from "../utils/session";

export default function SchedulerNavigation() {
    const location = useLocation();
    const name = getSession()?.user.nameUser ?? "Agendador";

    return (
        <div className="flex items-center gap-6">
            <Link
                to="/scheduler"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname.includes('/scheduler') ? 'bg-[#4f46e5] text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
                Agenda
            </Link>
            <div className="text-right">
                <p className="text-xs text-gray-500 leading-none">Bienvenido,</p>
                <p className="text-sm font-semibold text-gray-900 leading-tight">{name}</p>
            </div>
            <LogoutButton className="px-4 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 border border-gray-300 transition-colors" />
        </div>
    );
}