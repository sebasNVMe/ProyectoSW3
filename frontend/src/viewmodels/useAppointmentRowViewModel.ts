import { StatusAppointment } from "../types";
import type { Appointment, AppointmentRow } from "../types";


// Configuración de presentación

const statusConfig: Record<
    StatusAppointment,
    { label: string; dotColor: string; textColor: string }
> = {
    SCHEDULED: {
        label: "Agendada",
        dotColor: "bg-orange-400",
        textColor: "text-orange-500",
    },
    COMPLETED: {
        label: "Completada",
        dotColor: "bg-green-400",
        textColor: "text-green-600",
    },
    CANCELLED: {
        label: "Cancelada",
        dotColor: "bg-red-400",
        textColor: "text-red-500",
    },
    RESCHEDULED: {
        label: "Reagendada",
        dotColor: "bg-blue-400",
        textColor: "text-blue-500",
    },
};

const specialityColors: Record<string, string> = {
    Neural_Therapy: "bg-cyan-50 text-cyan-600 ring-cyan-200",
    Chiropractor: "bg-emerald-50 text-emerald-600 ring-emerald-200",
    Physiotherapy: "bg-amber-50 text-amber-600 ring-amber-200",
    General: "bg-indigo-50 text-indigo-600 ring-indigo-200",
};

const specialityLabels: Record<string, string> = {
    Neural_Therapy: "Terapia Neural",
    Chiropractor: "Quiropráctica",
    Physiotherapy: "Fisioterapia",
    General: "General",
};

//  Helpers

/** Formatea "HH:mm:ss" o "HH:mm" como "08:00 AM" */
function formatTime(time: string): string {
    const [h, m] = time.split(":");
    const hour = Number(h);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${String(hour12).padStart(2, "0")}:${m} ${ampm}`;
}


/** Propiedades de presentación a partir de una Appointment */
export function useAppointmentRowViewModel(appointment: Appointment): AppointmentRow {
    const status = statusConfig[appointment.statusApp] ?? statusConfig.SCHEDULED;
    const speciality = appointment.professional?.specialityProf ?? "";
    const specialityStyle =
        specialityColors[speciality] ?? "bg-slate-50 text-slate-600 ring-slate-200";
    const specialityLabel = specialityLabels[speciality] ?? speciality;

    const patientName = appointment.patient?.user
        ? `${appointment.patient.user.nameUser} ${appointment.patient.user.lastNameUser}`
        : "—";
    const patientCed = appointment.patient?.user?.cedUser
        ? String(appointment.patient.user.cedUser)
        : "—";
    const profName = appointment.professional?.user
        ? `${appointment.professional.user.nameUser} ${appointment.professional.user.lastNameUser}`
        : "—";

    const isActive = appointment.statusApp === StatusAppointment.SCHEDULED;

    return {
        formattedTime: formatTime(appointment.timeApp),
        patientName,
        patientCed,
        profName,
        specialityLabel,
        specialityStyle,
        statusLabel: status.label,
        statusDotColor: status.dotColor,
        statusTextColor: status.textColor,
        isActive,
    };
}
