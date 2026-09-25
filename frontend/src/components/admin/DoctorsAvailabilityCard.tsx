import { UserGroupIcon } from "@heroicons/react/24/outline";
import DoctorCard from "./DoctorCard";
import type { ProfessionalDraft } from "../../viewmodels/useAdminConfigViewModel";

const ALL_DAYS = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"] as const;
type DayLabel = (typeof ALL_DAYS)[number];

type DoctorsAvailabilityCardProps = {
    drafts: ProfessionalDraft[];
    isLoading: boolean;
    isError: boolean;
    onUpdateDraft: (codProf: number, patch: Partial<Omit<ProfessionalDraft, "codProf" | "name" | "speciality" | "dirty">>) => void;
    onToggleDay: (codProf: number, day: DayLabel) => void;
};

export default function DoctorsAvailabilityCard({ drafts, isLoading, isError, onUpdateDraft, onToggleDay }: DoctorsAvailabilityCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-gray-800">
                    <UserGroupIcon className="w-5 h-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold">Disponibilidad de Médicos y Terapistas</h3>
                </div>
            </div>

            {/* Carga de Profesionales */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400 space-y-3">
                    <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    <p className="text-sm font-medium">Cargando profesionales…</p>
                </div>
            )}

            {/* SI hay error en la carga */}
            {isError && (
                <div className="flex flex-col items-center justify-center py-16 text-red-400 space-y-2">
                    <p className="text-sm font-medium">Error al cargar los profesionales</p>
                    <p className="text-xs text-gray-400">Verifica que el servidor esté activo e intenta de nuevo.</p>
                </div>
            )}

            {/* Si no hay profesionales */}
            {!isLoading && !isError && drafts.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400 space-y-2">
                    <UserGroupIcon className="w-10 h-10" />
                    <p className="text-sm font-medium">No hay profesionales registrados</p>
                </div>
            )}

            {/* Listado de Profesionales */}
            {!isLoading && !isError && drafts.length > 0 && (
                <div className="space-y-6">
                    {drafts.map((draft) => (
                        <DoctorCard
                            key={draft.codProf}
                            draft={draft}
                            onUpdateDraft={onUpdateDraft}
                            onToggleDay={onToggleDay}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
