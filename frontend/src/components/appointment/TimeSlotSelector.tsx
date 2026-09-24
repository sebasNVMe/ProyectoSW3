import { ClockIcon } from '@heroicons/react/24/outline'
import Calendar from '../Calendar'

export default function TimeSlotSelector() {
    return (
        <div className="space-y-6">
            {/* Fecha */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    3. Selecciona la fecha
                </h3>
                <div className="flex justify-center">
                    <Calendar />
                </div>
            </div>

            {/* Hora */}
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    Hora disponible
                </h3>


                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">

                    {/* Hora seleccionada*/}
                    <button
                        type="button"
                        className="py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer bg-custom-blue text-white shadow-md shadow-indigo-200"
                    >
                        08:00 AM
                    </button>

                    {/* Hora no seleccionada*/}
                    <button
                        type="button"
                        className="py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer bg-white border border-gray-200 text-gray-700 hover:border-custom-blue hover:text-custom-blue"
                    >
                        09:00 AM
                    </button>
                </div>
            </div>
        </div>
    )
}
