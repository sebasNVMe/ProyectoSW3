import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function SpecialtySelector() {
    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                1. Elige tu especialidad
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Botón Seleccionado */}
                <button
                    type="button"
                    className="relative flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer group border-custom-blue bg-indigo-50 shadow-md shadow-indigo-100"
                >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 bg-custom-blue">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/3209/3209074.png"
                            alt="Cardiología"
                            className="w-6 h-6 brightness-0 invert"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-custom-blue">Cardiología</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                            Especialidad médica que se ocupa de las afecciones del corazón y del aparato circulatorio.
                        </p>
                    </div>
                    <CheckCircleIcon className="w-6 h-6 text-custom-blue absolute top-3 right-3" />
                </button>

                {/* Botón No Seleccionado */}
                <button
                    type="button"
                    className="relative flex items-start gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer group border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm"
                >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 bg-indigo-100 group-hover:bg-indigo-200">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
                            alt="Pediatría"
                            className="w-6 h-6"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-gray-900">Pediatría</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                            Especialidad médica que estudia al niño y sus enfermedades.
                        </p>
                    </div>
                </button>
            </div>
        </div>
    )
}
