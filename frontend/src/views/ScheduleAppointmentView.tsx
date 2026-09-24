import SpecialtySelector from '../components/appointment/SpecialtySelector'
import DoctorSelector from '../components/appointment/DoctorSelector'
import TimeSlotSelector from '../components/appointment/TimeSlotSelector'
import AppointmentSummary from '../components/appointment/AppointmentSummary'
import NextAppointment from '../components/appointment/NextAppointment'

export default function ScheduleAppointmentView() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Columna izquierda — Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Próximas citas */}
                    <NextAppointment />
                </div>

                {/* Columna derecha — Contenido secuencial (sin stepper) */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 space-y-10">
                        {/* Título */}
                        <div className="border-b border-gray-100 pb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Agendar Nueva Cita</h2>
                            <p className="text-sm text-gray-500 mt-1">Completa los siguientes pasos para agendar tu cita médica.</p>
                        </div>

                        <SpecialtySelector />
                        <DoctorSelector />
                        <TimeSlotSelector />

                        <div className="pt-6 border-t border-gray-100">
                            <AppointmentSummary />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
