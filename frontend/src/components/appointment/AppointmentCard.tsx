import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

interface AppointmentCardProps {
    doctorName: string;
    specialityLabel: string;
    specialityStyle: string;
    date: string;
    time: string;
    statusLabel: string;
    statusTextColor: string;
    statusBgColor: string;
    isActive: boolean;
    onCancel?: () => void;
    isCancelling?: boolean;
}

export default function AppointmentCard({
    doctorName,
    specialityLabel,
    specialityStyle,
    date,
    time,
    statusLabel,
    statusTextColor,
    statusBgColor,
    isActive,
    onCancel,
    isCancelling,
}: AppointmentCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col overflow-hidden">
            <div className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
                <div className="flex gap-6 items-start sm:items-center">
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-900">{doctorName}</h3>
                            <span
                                className={`inline-block text-xs font-medium px-3 py-1 rounded-full ring-1 ${specialityStyle}`}
                            >
                                {specialityLabel}
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
                            <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusBgColor} ${statusTextColor}`}
                            >
                                {statusLabel}
                            </span>
                        </div>
                    </div>
                </div>

                {isActive && (
                    <div className="flex flex-col gap-3 w-full sm:w-auto mt-4 sm:mt-0">
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={isCancelling}
                            className="bg-red-500 text-white font-medium py-2.5 px-6 rounded-xl hover:bg-red-600 shadow-sm hover:shadow-md hover:shadow-red-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isCancelling ? "Cancelando…" : "Cancelar Cita"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
