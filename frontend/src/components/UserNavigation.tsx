import { useQueryClient } from '@tanstack/react-query';
import type { LoginResponse } from '../types';

export default function UserNavigation() {
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<LoginResponse>(['user']);

    if (!user) {
        return null;
    }

    // Formatear cédula con puntos para miles (ej. 12.345.678)
    const formattedCedula = user.cedUser.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return (
        <div className="flex flex-col items-end">
            <span className="text-slate-500 text-base">Hola, {user.nameUser}</span>
            <span className="text-custom-blue font-medium text-lg tracking-wide">{formattedCedula}</span>
        </div>
    )
}