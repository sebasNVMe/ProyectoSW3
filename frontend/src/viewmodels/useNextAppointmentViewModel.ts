import { useQuery } from "@tanstack/react-query";
import { getPatientByCedula } from "../models/patient.model";
import { getAppointmentsByPatient } from "../models/appointment.model";
import { formatShortDate, formatTime } from "../utils/dateFormatters";
import { useUser } from "../hooks/useUser";
import type { Appointment } from "../types";

/** Construye un Date local a partir de "YYYY-MM-DD" y "HH:mm:ss" */
function parseAppointmentDate(dateStr: string, timeStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes);
}

export function useNextAppointmentViewModel() {
    const { user: authUser } = useUser();

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
