import { ExclamationTriangleIcon, } from '@heroicons/react/24/solid'

export default function ActiveAppointmentBlock() {
    return (
        <div className="animate-in fade-in duration-300">
            <div className="flex flex-col items-center text-center py-6 px-4">
                {/* Ícono de advertencia */}
                <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mb-5 ring-4 ring-amber-100">
                    <ExclamationTriangleIcon className="w-8 h-8 text-amber-500" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Ya tienes una cita agendada
                </h3>
                <p className="text-sm text-gray-500 max-w-md mb-6">
                    No puedes agendar una nueva cita hasta que tu cita actual sea completada o cancelada.
                </p>
            </div>
        </div>
    )
}
