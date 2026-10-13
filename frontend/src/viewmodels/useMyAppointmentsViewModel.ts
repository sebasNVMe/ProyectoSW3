import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { getPatientByCedula } from "../models/patient.model";
import { getAppointmentsByPatient, cancelAppointment } from "../models/appointment.model";
import { StatusAppointment } from "../types";
import type { Appointment } from "../types";
import { formatDate, formatTime } from "../utils/dateFormatters";



const statusConfig: Record<
    StatusAppointment,
    { label: string; textColor: string; bgColor: string }
> = {
    SCHEDULED: {
        label: "Agendada",
        textColor: "text-orange-500",
        bgColor: "bg-orange-50",
    },
    COMPLETED: {
        label: "Completada",
        textColor: "text-green-600",
        bgColor: "bg-green-50",
    },
    CANCELLED: {
        label: "Cancelada",
        textColor: "text-red-500",
        bgColor: "bg-red-50",
    },
    RESCHEDULED: {
        label: "Reagendada",
        textColor: "text-blue-500",
        bgColor: "bg-blue-50",
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



function getAuthUser():
    | { codUser: number; cedUser: number; nameUser: string; role: string }
    | undefined {
    try {
        const raw = localStorage.getItem("AUTH_USER");
        if (raw) return JSON.parse(raw);
    } catch {
    }
    return undefined;
}

export type AppointmentCardData = {
    codApp: number;
    doctorName: string;
    specialityLabel: string;
    specialityStyle: string;
    formattedDate: string;
    formattedTime: string;
    statusLabel: string;
    statusTextColor: string;
    statusBgColor: string;
    isActive: boolean;
    raw: Appointment;
};


export function useMyAppointmentsViewModel() {
    const queryClient = useQueryClient();
    const authUser =
        getAuthUser() ??
        queryClient.getQueryData<{
            codUser: number;
            cedUser: number;
            nameUser: string;
            role: string;
        }>(["user"]);

    // 1. Obtener el paciente
    const { data: patient } = useQuery({
        queryKey: ["patient", authUser?.cedUser],
        queryFn: () => getPatientByCedula(authUser!.cedUser),
        enabled: !!authUser?.cedUser,
    });

    // 2. Obtener las citas del paciente
    const {
        data: appointments = [],
        isLoading,
        isError,
    } = useQuery<Appointment[]>({
        queryKey: ["appointments", "patient", patient?.codPatient],
        queryFn: () => getAppointmentsByPatient(patient!.codPatient),
        enabled: !!patient?.codPatient,
    });

    // 3. Mutación para cancelar cita
    const { mutate: cancelMutate, isPending: isCancelling } = useMutation({
        mutationFn: cancelAppointment,
        onSuccess: () => {
            toast.success("Cita cancelada exitosamente");
            queryClient.invalidateQueries({ queryKey: ["appointments"] });
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                toast.error(
                    error.response.data.message ?? "Error al cancelar la cita"
                );
            } else {
                toast.error("Ocurrió un error inesperado al cancelar la cita");
            }
        },
    });

    function handleCancel(codApp: number) {
        cancelMutate(codApp);
    }

    // 4. Transformar a datos de presentación
    const cards: AppointmentCardData[] = appointments
        .map((app): AppointmentCardData => {
            const speciality = app.professional?.specialityProf ?? "";
            const status =
                statusConfig[app.statusApp] ?? statusConfig.SCHEDULED;

            return {
                codApp: app.codApp,
                doctorName: app.professional?.user
                    ? `${app.professional.user.nameUser} ${app.professional.user.lastNameUser}`
                    : "—",
                specialityLabel:
                    specialityLabels[speciality] ?? speciality,
                specialityStyle:
                    specialityColors[speciality] ??
                    "bg-slate-50 text-slate-600 ring-slate-200",
                formattedDate: formatDate(app.dateApp),
                formattedTime: formatTime(app.timeApp),
                statusLabel: status.label,
                statusTextColor: status.textColor,
                statusBgColor: status.bgColor,
                isActive: app.statusApp === StatusAppointment.SCHEDULED,
                raw: app,
            };
        })
        .sort((a, b) => {
            if (a.isActive && !b.isActive) return -1;
            if (!a.isActive && b.isActive) return 1;
            return 0;
        });

    return {
        cards,
        isLoading,
        isError,
        handleCancel,
        isCancelling,
    };
}
