import {
    CalendarDaysIcon,
    ClockIcon,
    UserIcon,
    BuildingOffice2Icon,
    ArrowLeftIcon,
    CheckIcon,
} from '@heroicons/react/24/outline'

export default function AppointmentSummary() {
    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <CalendarDaysIcon className="w-8 h-8 text-custom-blue" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Resumen de tu cita</h3>
                <p className="text-sm text-gray-500">Verifica que los datos sean correctos antes de confirmar</p>
            </div>

            {/* Detalles */}
            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-sm">
                <div className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-indigo-100 text-indigo-600">
                        <BuildingOffice2Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Especialidad</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize truncate">Cardiología</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-violet-100 text-violet-600">
                        <UserIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Médico</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize truncate">Dr. Miguel Torres</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-600">
                        <CalendarDaysIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Fecha</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize truncate">Lunes, 15 de noviembre de 2026</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-600">
                        <ClockIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Hora</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize truncate">08:00 AM</p>
                    </div>
                </div>
            </div>

            {/* Botones */}
            <div className="space-y-3">
                <button
                    type="button"
                    className="w-full bg-custom-blue hover:bg-custom-indigo text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 cursor-pointer active:scale-[0.98]"
                >
                    <CheckIcon className="w-5 h-5" />
                    Confirmar Cita Médica
                </button>

                <button
                    type="button"
                    className="w-full bg-white border-2 border-gray-200 hover:border-custom-blue text-gray-700 hover:text-custom-blue font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Modificar Datos
                </button>
            </div>

            <p className="text-xs text-center text-gray-400">
                Recibirás la confirmación y el recordatorio vía correo electrónico.
            </p>
        </div>
    )
}
