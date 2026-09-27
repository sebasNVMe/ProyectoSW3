import { useState } from 'react'
import { CheckIcon } from '@heroicons/react/24/solid'
import SpecialtySelector from '../components/appointment/SpecialtySelector'
import DoctorSelector from '../components/appointment/DoctorSelector'
import TimeSlotSelector from '../components/appointment/TimeSlotSelector'
import AppointmentSummary from '../components/appointment/AppointmentSummary'
import NextAppointment from '../components/appointment/NextAppointment'
import { useAppointmentViewModel } from '../viewmodels/useAppointmentViewModel'

const STEPS = [
    { id: 1, name: 'Especialidad' },
    { id: 2, name: 'Médico' },
    { id: 3, name: 'Fecha y Hora' },
    { id: 4, name: 'Confirmación' },
]

export default function ScheduleAppointmentView() {
    const {
        specialties,
        selectedSpeciality,
        handleSelectSpeciality,
        professionals,
        isLoadingProfessionals,
        isErrorProfessionals,
        selectedProfessional,
        handleSelectProfessional,
        selectedDate,
        handleSelectDate,
        disabledDaysOfWeek,
        availableSlots,
        isLoadingSlots,
        isErrorSlots,
        selectedSlot,
        handleSelectSlot,
        handleConfirm,
        isConfirming,
        selectedSpecialtyLabel,
        selectedDateStr,
    } = useAppointmentViewModel()

    const [currentStep, setCurrentStep] = useState(1)

    const canGoNext = () => {
        if (currentStep === 1) return !!selectedSpeciality
        if (currentStep === 2) return !!selectedProfessional
        if (currentStep === 3) return !!selectedDateStr && !!selectedSlot
        return false
    }

    const handleNext = () => {
        if (canGoNext() && currentStep < 4) {
            setCurrentStep(prev => prev + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1)
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Columna izquierda — Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <NextAppointment />
                </div>

                {/* Columna derecha — Contenido secuencial */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-8">
                        {/* Título */}
                        <div className="border-b border-gray-100 pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Agendar Nueva Cita</h2>
                            <p className="text-sm text-gray-500 mt-1">Completa los siguientes pasos para agendar tu cita médica.</p>
                        </div>

                        {/* Stepper Header */}
                        <div className="py-4 pb-10">
                            <ol role="list" className="flex items-center w-full">
                                {STEPS.map((step, stepIdx) => (
                                    <li key={step.name} className={`relative flex items-center ${stepIdx !== STEPS.length - 1 ? 'w-full' : ''}`}>
                                        <div className="relative flex flex-col items-center justify-center">
                                            <div className={`z-10 flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
                                                step.id < currentStep ? 'bg-custom-blue text-white shadow-sm' :
                                                step.id === currentStep ? 'border-2 border-custom-blue bg-white text-custom-blue shadow-sm' :
                                                'border-2 border-gray-200 bg-gray-50 text-gray-400'
                                            }`}>
                                                {step.id < currentStep ? (
                                                    <CheckIcon className="w-6 h-6" aria-hidden="true" />
                                                ) : (
                                                    <span className="text-sm font-semibold">{step.id}</span>
                                                )}
                                            </div>
                                            <div className={`absolute top-12 left-1/2 -translate-x-1/2 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                                                step.id <= currentStep ? 'text-gray-900' : 'text-gray-400'
                                            }`}>
                                                {step.name}
                                            </div>
                                        </div>
                                        {stepIdx !== STEPS.length - 1 && (
                                            <div className={`flex-auto h-1 mx-2 sm:mx-4 rounded-full transition-colors duration-200 ${
                                                step.id < currentStep ? 'bg-custom-blue' : 'bg-gray-100'
                                            }`} />
                                        )}
                                    </li>
                                ))}
                            </ol>
                        </div>

                        {/* Contenido del Paso */}
                        <div className="pt-2 min-h-[300px]">
                            {currentStep === 1 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                    <SpecialtySelector
                                        specialties={specialties}
                                        selectedSpeciality={selectedSpeciality}
                                        onSelect={(spec) => {
                                            handleSelectSpeciality(spec);
                                        }}
                                    />
                                </div>
                            )}
                            {currentStep === 2 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                    <DoctorSelector
                                        selectedSpeciality={selectedSpeciality}
                                        professionals={professionals}
                                        isLoading={isLoadingProfessionals}
                                        isError={isErrorProfessionals}
                                        selectedProfessional={selectedProfessional}
                                        onSelect={(prof) => {
                                            handleSelectProfessional(prof);
                                        }}
                                    />
                                </div>
                            )}
                            {currentStep === 3 && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                    <TimeSlotSelector
                                        selectedProfessional={selectedProfessional}
                                        selectedDate={selectedDate}
                                        onSelectDate={handleSelectDate}
                                        disabledDaysOfWeek={disabledDaysOfWeek}
                                        availableSlots={availableSlots}
                                        isLoadingSlots={isLoadingSlots}
                                        isErrorSlots={isErrorSlots}
                                        selectedSlot={selectedSlot}
                                        onSelectSlot={handleSelectSlot}
                                    />
                                </div>
                            )}
                            {currentStep === 4 && selectedProfessional && selectedDateStr && selectedSlot && (
                                <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                                    <AppointmentSummary
                                        specialtyLabel={selectedSpecialtyLabel}
                                        selectedProfessional={selectedProfessional}
                                        selectedDateStr={selectedDateStr}
                                        selectedSlot={selectedSlot}
                                        isConfirming={isConfirming}
                                        onConfirm={handleConfirm}
                                        onModify={() => setCurrentStep(1)}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Botones de Navegación */}
                        {currentStep < 4 && (
                            <div className="pt-6 border-t border-gray-100 flex justify-between items-center mt-8">
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    disabled={currentStep === 1}
                                    className={`px-5 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                                        currentStep === 1
                                            ? 'text-gray-400 bg-gray-50 cursor-not-allowed opacity-50'
                                            : 'text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-sm active:scale-95'
                                    }`}
                                >
                                    Atrás
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    disabled={!canGoNext()}
                                    className={`px-6 py-2.5 text-sm font-semibold text-white rounded-xl transition-all duration-200 flex items-center gap-2 ${
                                        canGoNext()
                                            ? 'bg-custom-blue hover:bg-custom-indigo shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 cursor-pointer active:scale-95'
                                            : 'bg-custom-blue/50 cursor-not-allowed opacity-60'
                                    }`}
                                >
                                    Siguiente
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
