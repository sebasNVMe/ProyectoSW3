import { Cog6ToothIcon } from "@heroicons/react/24/outline";

type GlobalParametersCardProps = {
    schedulingWeeks: number;
    onSchedulingWeeksChange: (value: number) => void;
};

export default function GlobalParametersCard({ schedulingWeeks, onSchedulingWeeksChange }: GlobalParametersCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6 text-gray-800">
                <Cog6ToothIcon className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-semibold">Parámetros Globales</h3>
            </div>

            <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-gray-600">
                    Ventana de agendamiento (semanas)
                </label>
                <input
                    type="number"
                    min={1}
                    max={52}
                    value={schedulingWeeks}
                    onChange={(e) => onSchedulingWeeksChange(Math.max(1, Number(e.target.value)))}
                    className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-100 rounded-lg text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none transition-colors sm:text-sm font-medium"
                />
                <p className="text-[11px] text-gray-400 mt-1 font-medium">
                    Tiempo máximo que un paciente puede agendar a futuro.
                </p>
            </div>
        </div>
    );
}
