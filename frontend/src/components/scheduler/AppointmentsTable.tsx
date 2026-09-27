import AppointmentRow from "./AppointmentRow";
import { useAppointmentRowViewModel } from "../../viewmodels/useAppointmentRowViewModel";
import type { Appointment, StatusAppointment } from "../../types";

type AppointmentsTableProps = {
    appointments: Appointment[];
    totalAppointments: number;
    displayDate: string;
    isLoading: boolean;
    isError: boolean;
    onChangeStatus: (id: number, status: StatusAppointment) => void;
    onCancel: (id: number) => void;
    isChangingStatus: boolean;
    isCancelling: boolean;
};

export default function AppointmentsTable({
    appointments,
    totalAppointments,
    displayDate,
    isLoading,
    isError,
    onChangeStatus,
    onCancel,
    isChangingStatus,
    isCancelling,
}: AppointmentsTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Encabezado de la tabla */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">
                    Listado de Citas –{" "}
                    <span className="text-slate-600 font-semibold">
                        {displayDate}
                    </span>
                </h2>
                <span className="inline-flex items-center bg-indigo-50 text-custom-blue text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full ring-1 ring-indigo-200">
                    {totalAppointments} citas encontradas
                </span>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/50">
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Hora
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Paciente
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Cédula
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Médico
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Especialidad
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Estado
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-12 text-center text-sm text-slate-500"
                                >
                                    <div className="flex flex-col items-center gap-3">
                                        <svg
                                            className="animate-spin h-8 w-8 text-custom-blue"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            ></path>
                                        </svg>
                                        Cargando citas...
                                    </div>
                                </td>
                            </tr>
                        )}

                        {isError && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-12 text-center text-sm text-red-500"
                                >
                                    Error al cargar las citas. Intenta nuevamente.
                                </td>
                            </tr>
                        )}

                        {!isLoading && !isError && appointments.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-12 text-center text-sm text-slate-400"
                                >
                                    No se encontraron citas con los filtros seleccionados.
                                </td>
                            </tr>
                        )}

                        {!isLoading &&
                            !isError &&
                            appointments.map((appointment) => {
                                const vm = useAppointmentRowViewModel(appointment);
                                return (
                                    <AppointmentRow
                                        key={appointment.codApp}
                                        codApp={appointment.codApp}
                                        {...vm}
                                        onChangeStatus={onChangeStatus}
                                        onCancel={onCancel}
                                        isChangingStatus={isChangingStatus}
                                        isCancelling={isCancelling}
                                    />
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
