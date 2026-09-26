import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useNextAppointmentViewModel } from "../../viewmodels/useNextAppointmentViewModel";

export default function NextAppointment() {
    const { isLoading, upcomingAppointments, formatDate, formatTime } = useNextAppointmentViewModel();

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
                <CalendarDaysIcon className="w-5 h-5 text-custom-blue" />
                <h3 className="font-bold text-gray-900">Próximas Citas</h3>
            </div>

            <div className="space-y-3">
                {isLoading ? (
                    <div className="text-sm text-gray-500 text-center py-4">Cargando citas...</div>
                ) : upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((app) => (
                        <div key={app.codApp} className="flex items-start gap-3 p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                            <div className="w-2 h-2 rounded-full bg-custom-blue mt-2 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-bold text-custom-blue bg-indigo-100 px-2 py-0.5 rounded-full uppercase truncate inline-block mb-1">
                                    {app.professional.specialityProf || 'Especialidad'}
                                </span>
                                <p className="font-semibold text-sm text-gray-900 truncate">
                                    {app.professional?.user?.nameUser || 'Médico'} {app.professional?.user?.lastNameUser || ''}
                                </p>
                                <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                    <CalendarDaysIcon className="w-3 h-3" />
                                    {formatDate(app.dateApp)} — {formatTime(app.timeApp)}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                        No tienes citas próximas agendadas.
                    </div>
                )}
            </div>

            <Link
                to="/my-appointments"
                className="block text-custom-blue text-sm font-semibold mt-4 hover:underline cursor-pointer w-full text-center"
            >
                Ver todas mis citas
            </Link>
        </div>
    )
}
