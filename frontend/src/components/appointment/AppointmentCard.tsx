import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

interface AppointmentCardProps {
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    status: 'agendada' | 'cancelada';
}

export default function AppointmentCard({
    doctorName,
    specialty,
    date,
    time,
    status,
}: AppointmentCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                <div className="flex gap-6 items-start sm:items-center">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-900">{doctorName}</h3>
                            <span className="px-3 py-1 bg-indigo-50 text-custom-blue text-xs font-bold rounded-full uppercase tracking-wider">
                                {specialty}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-custom-blue" />
                                <span>{date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="w-5 h-5 text-custom-blue" />
                                <span>{time}</span>
                            </div>
                        </div>

                        <div>
                            {status === 'agendada' ? (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    Confirmada
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                                    Cancelada
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                    {status === 'agendada' ? (
                        <button className="bg-gradient-to-r from-custom-blue to-custom-indigo text-white font-medium py-2.5 px-6 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-indigo-200">
                            Reprogramar
                        </button>
                    ) : (
                        <button className="bg-gradient-to-r from-custom-blue to-custom-indigo text-white font-medium py-2.5 px-6 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-indigo-200">
                            Pagar Ahora
                        </button>
                    )}
                    <button className="text-red-500 font-medium py-2.5 px-6 rounded-xl hover:bg-red-50 transition-colors">
                        Cancelar Cita
                    </button>
                </div>
            </div>
        </div>
    );
}
