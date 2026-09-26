import {
    CalendarDaysIcon,
    ClockIcon,
    UserIcon,
    BuildingOffice2Icon,
    ArrowLeftIcon,
    CheckIcon,
} from '@heroicons/react/24/outline'
import type { Professional, AppointmentSlot } from '../../types'

type Props = {
    specialtyLabel: string
    selectedProfessional: Professional
    selectedDateStr: string   // YYYY-MM-DD
    selectedSlot: AppointmentSlot
    isConfirming: boolean
    onConfirm: () => void
    onModify: () => void
}

/** Formatea "YYYY-MM-DD" como "Lunes, 15 de noviembre de 2026" */
function formatDate(dateStr: string): string {
    // Parsear como fecha local (sin desfase UTC)
    const [year, month, day] = dateStr.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date.toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })
}

/** Formatea "HH:mm:ss" o "HH:mm" como "08:00 AM" */
function formatTime(timeStr: string): string {
    const [hStr, mStr] = timeStr.split(':')
    const h = parseInt(hStr, 10)
    const m = mStr
    const period = h < 12 ? 'AM' : 'PM'
    const h12 = h % 12 === 0 ? 12 : h % 12
    return `${String(h12).padStart(2, '0')}:${m} ${period}`
}

export default function AppointmentSummary({
    specialtyLabel,
    selectedProfessional,
    selectedDateStr,
    selectedSlot,
    isConfirming,
    onConfirm,
    onModify,
}: Props) {
    const doctorName = `${selectedProfessional.user.nameUser} ${selectedProfessional.user.lastNameUser}`

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
                        <p className="text-sm font-semibold text-gray-900 capitalize truncate">{specialtyLabel}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-violet-100 text-violet-600">
                        <UserIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Médico</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize truncate">{doctorName}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-100 text-blue-600">
                        <CalendarDaysIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Fecha</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize truncate">
                            {formatDate(selectedDateStr)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-100 text-purple-600">
                        <ClockIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Hora</p>
                        <p className="text-sm font-semibold text-gray-900 capitalize truncate">
                            {formatTime(selectedSlot.timeApp)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Botones */}
            <div className="space-y-3">
                <button
                    id="btn-confirm-appointment"
                    type="button"
                    onClick={onConfirm}
                    disabled={isConfirming}
                    className="w-full bg-custom-blue hover:bg-custom-indigo text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 cursor-pointer active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isConfirming ? (
                        <>
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                            Confirmando…
                        </>
                    ) : (
                        <>
                            <CheckIcon className="w-5 h-5" />
                            Confirmar Cita Médica
                        </>
                    )}
                </button>

                <button
                    id="btn-modify-appointment"
                    type="button"
                    onClick={onModify}
                    disabled={isConfirming}
                    className="w-full bg-white border-2 border-gray-200 hover:border-custom-blue text-gray-700 hover:text-custom-blue font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
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
