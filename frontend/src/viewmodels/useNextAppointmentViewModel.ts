import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatientByCedula } from "../models/patient.model";
import { getAppointmentsByPatient } from "../models/appointment.model";
import type { Appointment } from "../types";

// Se obtienen los datos del usuario autenticado
function getAuthUser(): { codUser: number; cedUser: number; nameUser: string; role: string } | undefined {
    try {
        const raw = localStorage.getItem('AUTH_USER')
        if (raw) return JSON.parse(raw)
    } catch { }
    return undefined
}

export function useNextAppointmentViewModel() {
    const queryClient = useQueryClient();
    const authUser = getAuthUser() ?? queryClient.getQueryData<{ codUser: number; cedUser: number; nameUser: string; role: string }>(['user']);

    // 1. Obtener el paciente (si existe)
    const { data: patient } = useQuery({
        queryKey: ['patient', authUser?.cedUser],
        queryFn: () => getPatientByCedula(authUser!.cedUser),
        enabled: !!authUser?.cedUser,
    });

    // 2. Obtener las citas del paciente
    const { data: appointments = [], isLoading } = useQuery<Appointment[]>({
        queryKey: ['appointments', 'patient', patient?.codPatient],
        queryFn: () => getAppointmentsByPatient(patient!.codPatient),
        enabled: !!patient?.codPatient,
    });

    // Filtrar solo las citas futuras que estén SCHEDULED
    const now = new Date();
    const upcomingAppointments = appointments
        .filter(app => {
            if (app.statusApp !== 'SCHEDULED') return false;
            // Parsear "YYYY-MM-DD" y "HH:mm:ss" a Date local
            const [year, month, day] = app.dateApp.split('-').map(Number);
            const [hours, minutes] = app.timeApp.split(':').map(Number);
            const appDate = new Date(year, month - 1, day, hours, minutes);
            return appDate >= now;
        })
        .sort((a, b) => {
            const dateA = new Date(`${a.dateApp}T${a.timeApp}`);
            const dateB = new Date(`${b.dateApp}T${b.timeApp}`);
            return dateA.getTime() - dateB.getTime();
        })

    /** Formatea "YYYY-MM-DD" */
    const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day);

        const capitalize = (str: string) => {
            const cleanStr = str.replace(/\./g, '');
            return cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
        };

        const weekday = capitalize(date.toLocaleDateString('es-CO', { weekday: 'short' }));
        const dayNum = date.getDate().toString().padStart(2, '0');
        const monthName = capitalize(date.toLocaleDateString('es-CO', { month: 'short' }));

        return `${weekday}, ${dayNum}${monthName}`;
    };

    /** Formatea "HH:mm:ss" a "hh:mm a" */
    const formatTime = (timeStr: string) => {
        const [hStr, mStr] = timeStr.split(':');
        const h = parseInt(hStr, 10);
        const period = h < 12 ? 'AM' : 'PM';
        const h12 = h % 12 === 0 ? 12 : h % 12;
        return `${String(h12).padStart(2, '0')}:${mStr} ${period}`;
    };

    return {
        isLoading,
        upcomingAppointments,
        formatDate,
        formatTime,
    };
}
