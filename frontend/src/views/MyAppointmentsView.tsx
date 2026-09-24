import NewAppointmentBanner from '../components/appointment/NewAppointmentBanner';
import AppointmentCard from '../components/appointment/AppointmentCard';

export default function MyAppointmentsView() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Columna Izquierda - Banner de Nueva Cita */}
                <div className="lg:col-span-4 space-y-6">
                    <NewAppointmentBanner />
                </div>

                {/* Columna Derecha - Lista de Citas */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex justify-between items-center pb-2">
                        <h1 className="text-3xl font-bold text-gray-900">Mis Citas</h1>
                    </div>

                    <div className="space-y-6">
                        <AppointmentCard
                            doctorName="Dra. Ana López"
                            specialty="CARDIOLOGÍA"
                            date="Miércoles, 14 de Octubre, 2026"
                            time="09:00 AM"
                            status="agendada"
                        />

                        <AppointmentCard
                            doctorName="Dr. Carlos Ruiz"
                            specialty="PEDIATRÍA"
                            date="Viernes, 23 de Octubre, 2026"
                            time="10:30 AM"
                            status="cancelada"
                        />

                        <AppointmentCard
                            doctorName="Dra. María Torres"
                            specialty="DERMATOLOGÍA"
                            date="Lunes, 02 de Noviembre, 2026"
                            time="02:15 PM"
                            status="agendada"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
