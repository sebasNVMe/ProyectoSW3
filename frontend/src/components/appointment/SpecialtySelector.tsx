import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { type SpecialityProfEnum, type Specialty } from '../../types'

type Props = {
    specialties: Specialty[]
    selectedSpeciality: SpecialityProfEnum | null
    onSelect: (speciality: SpecialityProfEnum) => void
}

export default function SpecialtySelector({ specialties, selectedSpeciality, onSelect }: Props) {
    return (
        <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                1. Elige tu especialidad
            </h3>

            <div className="grid grid-cols-1 gap-4">
                {specialties.map((specialty) => {
                    const isSelected = selectedSpeciality === specialty.value
                    return (
                        <button
                            key={specialty.value}
                            type="button"
                            onClick={() => onSelect(specialty.value)}
                            className={`relative flex items-center p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer group ${isSelected
                                    ? 'border-custom-blue bg-indigo-50 shadow-md shadow-indigo-100'
                                    : 'border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm'
                                }`}
                        >
                            <div className="flex-1 min-w-0 pr-8">
                                <p className={`font-semibold text-sm ${isSelected ? 'text-custom-blue' : 'text-gray-900'}`}>
                                    {specialty.label}
                                </p>
                                <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                                    {specialty.description}
                                </p>
                            </div>
                            {isSelected && (
                                <CheckCircleIcon className="w-6 h-6 text-custom-blue absolute right-5" />
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
