import { CheckCircleIcon } from '@heroicons/react/24/solid'
import type { Professional, SpecialityProfEnum } from '../../types'

type Props = {
    selectedSpeciality: SpecialityProfEnum | null
    professionals: Professional[]
    isLoading: boolean
    isError: boolean
    selectedProfessional: Professional | null
    onSelect: (professional: Professional) => void
}

export default function DoctorSelector({
    selectedSpeciality,
    professionals,
    isLoading,
    isError,
    selectedProfessional,
    onSelect,
}: Props) {
    if (!selectedSpeciality) {
        return (
            <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    2. Elige tu especialista
                </h3>
                <p className="text-sm text-gray-400 italic">Selecciona una especialidad primero.</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                2. Elige tu especialista
            </h3>

            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-custom-blue" />
                    <span className="ml-3 text-sm text-gray-500">Cargando profesionales...</span>
                </div>
            )}

            {isError && (
                <p className="text-sm text-red-500">
                    Error al cargar los profesionales. Intenta de nuevo.
                </p>
            )}

            {!isLoading && !isError && professionals.length === 0 && (
                <p className="text-sm text-gray-400 italic">
                    No hay profesionales disponibles en esta especialidad.
                </p>
            )}

            {!isLoading && !isError && professionals.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {professionals.map((professional) => {
                        const isSelected = selectedProfessional?.codProf === professional.codProf
                        const fullName = professional.user
                            ? `${professional.user.nameUser} ${professional.user.lastNameUser}`
                            : `Profesional #${professional.codProf}`

                        return (
                            <button
                                key={professional.codProf}
                                type="button"
                                onClick={() => onSelect(professional)}
                                className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer group ${
                                    isSelected
                                        ? 'border-custom-blue bg-indigo-50 shadow-md shadow-indigo-100'
                                        : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                                }`}
                            >
                                <div className="flex-1 min-w-0">
                                    <p
                                        className={`font-semibold text-sm truncate ${
                                            isSelected ? 'text-custom-blue' : 'text-gray-900'
                                        }`}
                                    >
                                        {fullName}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {professional.typeProf}
                                    </p>
                                </div>
                                {isSelected && (
                                    <CheckCircleIcon className="w-5 h-5 text-custom-blue flex-shrink-0" />
                                )}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
