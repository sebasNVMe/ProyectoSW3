import SpecialtySelector from '../components/appointment/SpecialtySelector'
import DoctorSelector from '../components/appointment/DoctorSelector'
import TimeSlotSelector from '../components/appointment/TimeSlotSelector'
import AppointmentSummary from '../components/appointment/AppointmentSummary'
import NextAppointment from '../components/appointment/NextAppointment'
import { useAppointmentViewModel } from '../viewmodels/useAppointmentViewModel'

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
        // Resumen y confirmación
        showSummary,
        handleShowSummary,
        handleModify,
        handleConfirm,
        isConfirming,
        isReadyToConfirm,
        selectedSpecialtyLabel,
        selectedDateStr,
    } = useAppointmentViewModel()

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Columna izquierda — Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Próximas citas */}
                    <NextAppointment />
                </div>

                {/* Columna derecha — Contenido secuencial */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-10">
                        {/* Título */}
                        <div className="border-b border-gray-100 pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Agendar Nueva Cita</h2>
                            <p className="text-sm text-gray-500 mt-1">Completa los siguientes pasos para agendar tu cita médica.</p>
                        </div>

                        {showSummary && selectedProfessional && selectedDateStr && selectedSlot ? (
                            /* ── Paso 4: Resumen y confirmación ── */
                            <div className="pt-2">
                                <AppointmentSummary
                                    specialtyLabel={selectedSpecialtyLabel}
                                    selectedProfessional={selectedProfessional}
                                    selectedDateStr={selectedDateStr}
                                    selectedSlot={selectedSlot}
                                    isConfirming={isConfirming}
                                    onConfirm={handleConfirm}
                                    onModify={handleModify}
                                />
                            </div>
                        ) : (
                            /* ── Pasos 1-3: Selección de datos ── */
                            <>
                                <SpecialtySelector
                                    specialties={specialties}
                                    selectedSpeciality={selectedSpeciality}
                                    onSelect={handleSelectSpeciality}
                                />

                                <DoctorSelector
                                    selectedSpeciality={selectedSpeciality}
                                    professionals={professionals}
                                    isLoading={isLoadingProfessionals}
                                    isError={isErrorProfessionals}
                                    selectedProfessional={selectedProfessional}
                                    onSelect={handleSelectProfessional}
                                />

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

                                {/* Botón para ir al resumen */}
                                <div className="pt-6 border-t border-gray-100">
                                    <button
                                        id="btn-go-to-summary"
                                        type="button"
                                        onClick={handleShowSummary}
                                        disabled={!isReadyToConfirm}
                                        className="w-full bg-custom-blue hover:bg-custom-indigo disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 cursor-pointer active:scale-[0.98]"
                                    >
                                        Continuar al resumen →
                                    </button>
                                    {!isReadyToConfirm && (
                                        <p className="text-xs text-center text-gray-400 mt-2">
                                            Selecciona especialidad, médico, fecha y hora para continuar.
                                        </p>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
