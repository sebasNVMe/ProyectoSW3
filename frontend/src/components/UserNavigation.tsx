import LogoutButton from "./LogoutButton";
import { useUser } from "../hooks/useUser";

export default function UserNavigation() {
    const { user } = useUser();

    if (!user) {
        return null;
    }

    // Formatear cédula con puntos para miles (ej. 12.345.678)
    const formattedCedula = user.cedUser.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return (
        <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
                <span className="text-slate-500 text-base">Hola, {user.nameUser}</span>
                <span className="text-custom-blue font-medium text-lg tracking-wide">{formattedCedula}</span>
            </div>
            <LogoutButton className="text-slate-500 hover:text-custom-blue text-base transition-colors" />
        </div>
    )
}