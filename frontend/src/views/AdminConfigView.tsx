import GlobalParametersCard from "../components/admin/GlobalParametersCard";
import DoctorsAvailabilityCard from "../components/admin/DoctorsAvailabilityCard";
import { useAdminConfigViewModel } from "../viewmodels/useAdminConfigViewModel";

export default function AdminConfigView() {
    const {
        schedulingWeeks,
        setSchedulingWeeks,
        drafts,
        isLoading,
        isError,
        isSaving,
        updateDraft,
        toggleDay,
        saveAll,
    } = useAdminConfigViewModel();

    return (
        <div className="animate-fade-in pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Configuración del Sistema</h2>
                    <p className="text-gray-500 mt-1">Define los parámetros de agendamiento y disponibilidad de médicos.</p>
                </div>
                <button
                    onClick={saveAll}
                    disabled={isSaving}
                    className="bg-[#4f46e5] hover:bg-[#4338ca] disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-md font-medium transition-colors shadow-sm flex items-center gap-2"
                >
                    {isSaving && (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    )}
                    {isSaving ? "Guardando…" : "Guardar Todos los Cambios"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Parámetros Globales */}
                <div className="lg:col-span-1 space-y-6">
                    <GlobalParametersCard
                        schedulingWeeks={schedulingWeeks}
                        onSchedulingWeeksChange={setSchedulingWeeks}
                    />
                </div>

                {/* Disponibilidad de Profesionales */}
                <div className="lg:col-span-2">
                    <DoctorsAvailabilityCard
                        drafts={drafts}
                        isLoading={isLoading}
                        isError={isError}
                        onUpdateDraft={updateDraft}
                        onToggleDay={toggleDay}
                    />
                </div>
            </div>
        </div>
    );
}
