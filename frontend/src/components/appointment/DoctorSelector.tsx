import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function DoctorSelector() {
    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Elige tu especialista
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Especialista Seleccionado */}
                <button
                    type="button"
                    className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer group border-custom-blue bg-indigo-50 shadow-md shadow-indigo-100"
                >

                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate text-custom-blue">
                            Dr. Miguel Torres
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Cardiología
                        </p>
                    </div>
                    <CheckCircleIcon className="w-5 h-5 text-custom-blue flex-shrink-0" />
                </button>

                {/* Especialista No Seleccionado */}
                <button
                    type="button"
                    className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer group border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm"
                >
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate text-gray-900">
                            Dra. Ana Rojas
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Cardiología
                        </p>
                    </div>
                </button>
            </div>
        </div>
    )
}
