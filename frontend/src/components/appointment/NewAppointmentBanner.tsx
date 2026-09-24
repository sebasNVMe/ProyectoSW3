import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function NewAppointmentBanner() {
    return (
        <div className="bg-gradient-to-br from-custom-blue to-custom-indigo rounded-2xl p-6 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
            {/* Decoración de fondo */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-6 -translate-x-6" />

            <div className="relative z-10 space-y-4">
                <h2 className="text-2xl font-bold">Mi Salud Piedrazul</h2>
                <p className="text-indigo-200 text-sm">
                    Gestiona tus citas y bienestar en un solo lugar.
                </p>
                <button
                    type="button"
                    className="flex items-center gap-2 bg-white text-custom-blue font-semibold
                                        py-2.5 px-5 rounded-lg transition-all hover:bg-indigo-50
                                        shadow-md cursor-pointer active:scale-[0.98] w-full justify-center"
                >
                    <PlusCircleIcon className="w-5 h-5" />
                    Nueva Cita
                </button>
            </div>
        </div>
    )
}