import { StatusAppointment } from "../../types";

type AppointmentRowProps = {
    codApp: number;
    formattedTime: string;
    patientName: string;
    patientCed: string;
    profName: string;
    specialityLabel: string;
    specialityStyle: string;
    statusLabel: string;
    statusDotColor: string;
    statusTextColor: string;
    isActive: boolean;
    onChangeStatus: (id: number, status: StatusAppointment) => void;
    onCancel: (id: number) => void;
    isChangingStatus: boolean;
    isCancelling: boolean;
};

export default function AppointmentRow({
    codApp,
    formattedTime,
    patientName,
    patientCed,
    profName,
    specialityLabel,
    specialityStyle,
    statusLabel,
    statusDotColor,
    statusTextColor,
    isActive,
    onChangeStatus,
    onCancel,
    isChangingStatus,
    isCancelling,
}: AppointmentRowProps) {
    return (
        <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
            <td className="py-4 px-4 text-sm font-medium text-slate-700">
                {formattedTime}
            </td>
            <td className="py-4 px-4 text-sm font-medium text-slate-800">
                {patientName}
            </td>
            <td className="py-4 px-4 text-sm text-slate-600 font-mono">
                {patientCed}
            </td>
            <td className="py-4 px-4 text-sm text-slate-700">{profName}</td>
            <td className="py-4 px-4">
                <span
                    className={`inline-block text-xs font-medium px-3 py-1 rounded-full ring-1 ${specialityStyle}`}
                >
                    {specialityLabel}
                </span>
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                    <span
                        className={`w-2 h-2 rounded-full ${statusDotColor}`}
                    ></span>
                    <span className={`text-sm font-medium ${statusTextColor}`}>
                        {statusLabel}
                    </span>
                </div>
            </td>
            <td className="py-4 px-4">
                {isActive && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() =>
                                onChangeStatus(
                                    codApp,
                                    StatusAppointment.COMPLETED
                                )
                            }
                            disabled={isChangingStatus}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 ring-1 ring-green-200 transition-all cursor-pointer disabled:opacity-50"
                        >
                            Completar
                        </button>
                        <button
                            onClick={() => onCancel(codApp)}
                            disabled={isCancelling}
                            className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 ring-1 ring-red-200 transition-all cursor-pointer disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}
