import NewAppointmentBanner from '../components/appointment/NewAppointmentBanner';
import AppointmentCard from '../components/appointment/AppointmentCard';
import { useMyAppointmentsViewModel } from '../viewmodels/useMyAppointmentsViewModel';
import { CalendarDaysIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function MyAppointmentsView() {
    const { cards, isLoading, isError, handleCancel, isCancelling } =
        useMyAppointmentsViewModel();

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

                    {isLoading ? (
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-pulse"
                                >
                                    <div className="flex gap-6 items-center">
                                        <div className="space-y-3 flex-1">
                                            <div className="flex items-center gap-3">
                                                <div className="h-5 bg-gray-200 rounded w-40" />
                                                <div className="h-5 bg-gray-200 rounded-full w-24" />
                                            </div>
                                            <div className="flex gap-6">
                                                <div className="h-4 bg-gray-200 rounded w-48" />
                                                <div className="h-4 bg-gray-200 rounded w-20" />
                                            </div>
                                            <div className="h-5 bg-gray-200 rounded-full w-24" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="flex flex-col items-center gap-3 py-12 text-center bg-red-50 rounded-2xl border border-red-100">
                            <ExclamationTriangleIcon className="w-10 h-10 text-red-400" />
                            <p className="text-red-600 font-medium">
                                Ocurrió un error al cargar las citas.
                            </p>
                            <p className="text-sm text-red-400">
                                Intenta recargar la página o vuelve más tarde.
                            </p>
                        </div>
                    ) : cards.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <CalendarDaysIcon className="w-10 h-10 text-gray-300" />
                            <p className="text-gray-500 font-medium">
                                Aún no tienes citas registradas.
                            </p>
                            <p className="text-sm text-gray-400">
                                Agenda tu primera cita usando el botón "Nueva Cita".
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cards.map((card) => (
                                <AppointmentCard
                                    key={card.codApp}
                                    doctorName={card.doctorName}
                                    specialityLabel={card.specialityLabel}
                                    specialityStyle={card.specialityStyle}
                                    date={card.formattedDate}
                                    time={card.formattedTime}
                                    statusLabel={card.statusLabel}
                                    statusTextColor={card.statusTextColor}
                                    statusBgColor={card.statusBgColor}
                                    isActive={card.isActive}
                                    onCancel={() => handleCancel(card.codApp)}
                                    isCancelling={isCancelling}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
