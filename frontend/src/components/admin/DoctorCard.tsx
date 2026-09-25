import { ClockIcon } from "@heroicons/react/24/outline";
import type { ProfessionalDraft } from "../../viewmodels/useAdminConfigViewModel";

const ALL_DAYS = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"] as const;
type DayLabel = (typeof ALL_DAYS)[number];

const SPECIALITY_LABELS: Record<string, string> = {
    Neural_Therapy: "Terapia Neural",
    Chiropractor: "Quiropráctica",
    Physiotherapy: "Fisioterapia",
    General: "General",
};

type DoctorCardProps = {
    draft: ProfessionalDraft;
    onUpdateDraft: (codProf: number, patch: Partial<Omit<ProfessionalDraft, "codProf" | "name" | "speciality" | "dirty">>) => void;
    onToggleDay: (codProf: number, day: DayLabel) => void;
};

export default function DoctorCard({ draft, onUpdateDraft, onToggleDay }: DoctorCardProps) {
    const { codProf, name, speciality, arrivalTime, departureTime, attentionInterval, unavailableDays, dirty } = draft;

    return (
        <div className={`border rounded-lg p-5 transition-all duration-200 ${dirty ? "border-indigo-300 bg-indigo-50/30 shadow-md" : "border-gray-100"}`}>
            {/* Header*/}
            <div className="flex items-start justify-between mb-5">
                <div>
                    <h4 className="font-semibold text-gray-900 text-lg leading-tight">{name}</h4>
                    <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">
                        {SPECIALITY_LABELS[speciality] ?? speciality}
                    </span>
                </div>
                {dirty && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">
                        Sin guardar
                    </span>
                )}
            </div>

            {/* Parámetros del agendamiento */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                {/* Tiempo de llegada */}
                <div className="space-y-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <ClockIcon className="w-3.5 h-3.5" />
                        Hora llegada
                    </label>
                    <input
                        type="time"
                        value={arrivalTime}
                        onChange={(e) => onUpdateDraft(codProf, { arrivalTime: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-100 rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-colors text-sm font-medium"
                    />
                </div>

                {/* Tiempo de salida */}
                <div className="space-y-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <ClockIcon className="w-3.5 h-3.5" />
                        Hora salida
                    </label>
                    <input
                        type="time"
                        value={departureTime}
                        onChange={(e) => onUpdateDraft(codProf, { departureTime: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-100 rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-colors text-sm font-medium"
                    />
                </div>

                {/* Intervalo de atención */}
                <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                        Intervalo (min)
                    </label>
                    <input
                        type="number"
                        min={5}
                        max={120}
                        step={5}
                        value={attentionInterval}
                        onChange={(e) => onUpdateDraft(codProf, { attentionInterval: Math.max(5, Number(e.target.value)) })}
                        className="w-full px-3 py-2 bg-gray-50 border-2 border-gray-100 rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-colors text-sm font-medium"
                    />
                </div>
            </div>

            {/* Dias laborales */}
            <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Días laborales</p>
                <div className="grid grid-cols-7 gap-2">
                    {ALL_DAYS.map((day) => {
                        const isUnavailable = unavailableDays.has(day);
                        const isActive = !isUnavailable;

                        return (
                            <button
                                key={day}
                                type="button"
                                onClick={() => onToggleDay(codProf, day)}
                                className={`flex flex-col items-center justify-center py-2.5 rounded-lg border-2 transition-all duration-150 cursor-pointer select-none ${isActive
                                    ? "bg-indigo-50 border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300"
                                    : "bg-gray-50 border-gray-100 opacity-60 hover:opacity-80 hover:bg-gray-100"
                                    }`}
                            >
                                <span
                                    className={`text-xs font-bold mb-0.5 ${isActive ? "text-indigo-500" : "text-gray-400"
                                        }`}
                                >
                                    {day}
                                </span>
                                <span
                                    className={`text-[10px] font-semibold ${isActive ? "text-indigo-700" : "text-gray-400"
                                        }`}
                                >
                                    {isActive
                                        ? `${arrivalTime}-${departureTime}`
                                        : "Sin atención"}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
