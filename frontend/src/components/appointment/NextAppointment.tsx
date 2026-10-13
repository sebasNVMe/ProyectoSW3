import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useNextAppointmentViewModel } from "../../viewmodels/useNextAppointmentViewModel";

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

export default function NextAppointment() {
    const { isLoading, nextAppointment, formatDate, formatTime } = useNextAppointmentViewModel();
    const activeAppointment = nextAppointment;

    const speciality = activeAppointment?.professional?.specialityProf || '';
    const badgeStyle = specialityColors[speciality] || 'bg-indigo-50 text-indigo-600 ring-indigo-200';
    const badgeLabel = specialityLabels[speciality] || speciality || 'General';

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
                <CalendarDaysIcon className="w-5 h-5 text-custom-blue" />
                <h3 className="font-bold text-gray-900">Próxima Cita</h3>
            </div>

            <div>
                {isLoading ? (
                    <div className="text-sm text-gray-500 text-center py-4">Cargando cita...</div>
                ) : activeAppointment ? (
                    <div className="p-3.5 rounded-xl bg-gray-50/80 border border-gray-100 hover:border-gray-200 transition-colors">
                        <div className="min-w-0">
                            <span className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full ring-1 mb-1.5 ${badgeStyle}`}>
                                {badgeLabel}
                            </span>
                            <p className="font-semibold text-sm text-gray-900 truncate">
                                {activeAppointment.professional?.user?.nameUser || 'Médico'} {activeAppointment.professional?.user?.lastNameUser || ''}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1.5">
                                <CalendarDaysIcon className="w-3.5 h-3.5 text-gray-400" />
                                <span>{formatDate(activeAppointment.dateApp)} — {formatTime(activeAppointment.timeApp)}</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        No tienes una cita agendada en este momento.
                    </div>
                )}
            </div>

            <Link
                to="/my-appointments"
                className="block text-custom-blue text-sm font-semibold mt-4 hover:underline cursor-pointer w-full text-center"
            >
                Ver mi historial de citas
            </Link>
        </div>
    )
}
