import { ClockIcon } from '@heroicons/react/24/outline'
import Calendar from '../Calendar'
import type { AppointmentSlot, Professional } from '../../types'

type Props = {
    selectedProfessional: Professional | null
    selectedDate: Date | undefined
    onSelectDate: (date: Date | undefined) => void
    disabledDaysOfWeek: number[]
    availableSlots: AppointmentSlot[]
    isLoadingSlots: boolean
    isErrorSlots: boolean
    selectedSlot: AppointmentSlot | null
    onSelectSlot: (slot: AppointmentSlot) => void
}

/** Convierte "HH:mm:ss" a "HH:mm AM/PM" */
function formatTime(time: string): string {
    const [h, m] = time.split(':').map(Number)
    const suffix = h >= 12 ? 'PM' : 'AM'
    const hour12 = h % 12 || 12
    return `${String(hour12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`
}

export default function TimeSlotSelector({
    selectedProfessional,
    selectedDate,
    onSelectDate,
    disabledDaysOfWeek,
    availableSlots,
    isLoadingSlots,
    isErrorSlots,
    selectedSlot,
    onSelectSlot,
}: Props) {
    if (!selectedProfessional) {
        return (
            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        3. Selecciona la fecha y hora
                    </h3>
                    <p className="text-sm text-gray-400 italic">Selecciona un profesional primero.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Fecha */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    3. Selecciona la fecha
                </h3>
                <div className="flex justify-center">
                    <Calendar
                        selected={selectedDate}
                        onSelect={onSelectDate}
                        disabledDaysOfWeek={disabledDaysOfWeek}
                    />
                </div>
            </div>

            {/* Hora */}
            {selectedDate && (
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <ClockIcon className="w-4 h-4" />
                        Hora disponible
                    </h3>

                    {isLoadingSlots && (
                        <div className="flex items-center justify-center py-6">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-custom-blue" />
                            <span className="ml-3 text-sm text-gray-500">Cargando horarios...</span>
                        </div>
                    )}

                    {isErrorSlots && (
                        <p className="text-sm text-red-500">
                            Error al cargar los horarios. Intenta de nuevo.
                        </p>
                    )}

                    {!isLoadingSlots && !isErrorSlots && availableSlots.length === 0 && (
                        <p className="text-sm text-gray-400 italic">
                            No hay horarios disponibles para esta fecha.
                        </p>
                    )}

                    {!isLoadingSlots && !isErrorSlots && availableSlots.length > 0 && (
                        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                            {availableSlots.map((slot) => {
                                const isSelected =
                                    selectedSlot?.timeApp === slot.timeApp &&
                                    selectedSlot?.codProf === slot.codProf
                                return (
                                    <button
                                        key={`${slot.codProf}-${slot.timeApp}`}
                                        type="button"
                                        onClick={() => onSelectSlot(slot)}
                                        className={`py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                                            isSelected
                                                ? 'bg-custom-blue text-white shadow-md shadow-indigo-200'
                                                : 'bg-white border border-gray-200 text-gray-700 hover:border-custom-blue hover:text-custom-blue'
                                        }`}
                                    >
                                        {formatTime(slot.timeApp)}
                                    </button>
                                )
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
