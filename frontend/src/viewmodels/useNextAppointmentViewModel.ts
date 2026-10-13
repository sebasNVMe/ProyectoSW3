import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPatientByCedula } from "../models/patient.model";
import { getAppointmentsByPatient } from "../models/appointment.model";
import { formatShortDate, formatTime } from "../utils/dateFormatters";
import type { Appointment } from "../types";

// Se obtienen los datos del usuario autenticado
function getAuthUser(): { codUser: number; cedUser: number; nameUser: string; role: string } | undefined {
    try {
        const raw = localStorage.getItem('AUTH_USER')
        if (raw) return JSON.parse(raw)
    } catch { }
    return undefined
}

/** Construye un Date local a partir de "YYYY-MM-DD" y "HH:mm:ss" */
function parseAppointmentDate(dateStr: string, timeStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
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
    const now = new Date();
    const nextAppointment = appointments.find(app =>
        app.statusApp === 'SCHEDULED' && parseAppointmentDate(app.dateApp, app.timeApp) >= now
    ) ?? null;

    return {
        isLoading,
        nextAppointment,
        formatDate: formatShortDate,
        formatTime,
    };
}
