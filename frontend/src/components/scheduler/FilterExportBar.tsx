import { FunnelIcon, ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function FilterExportBar() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row items-end gap-4">
                {/* Médico / Terapeuta */}
                <div className="flex-1 min-w-0 w-full lg:w-auto">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Médico / Terapeuta
                    </label>
                    <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-custom-blue focus:ring-2 focus:ring-custom-blue/20 focus:outline-none transition-all appearance-none cursor-pointer">
                        <option>Todos los médicos</option>
                        <option>Dra. Ana López</option>
                        <option>Dr. Carlos Ruiz</option>
                        <option>Dra. María Torres</option>
                    </select>
                </div>

                {/* Fecha de Citas */}
                <div className="flex-1 min-w-0 w-full lg:w-auto">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Fecha de Citas
                    </label>
                    <input
                        type="date"
                        defaultValue="2026-10-07"
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-custom-blue focus:ring-2 focus:ring-custom-blue/20 focus:outline-none transition-all"
                    />
                </div>

                {/* Historial por Cédula */}
                <div className="flex-1 min-w-0 w-full lg:w-auto">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                        Historial por Cédula
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Cédula del paciente..."
                            className="w-full rounded-lg border border-slate-300 bg-white pl-4 pr-10 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-custom-blue focus:ring-2 focus:ring-custom-blue/20 focus:outline-none transition-all"
                        />
                        <MagnifyingGlassIcon className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                    </div>
                </div>

                {/* Botones */}
                <div className="flex items-center gap-3 w-full lg:w-auto">
                    <button className="flex items-center gap-2 bg-custom-blue hover:bg-custom-indigo text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <FunnelIcon className="w-4 h-4" />
                        Filtrar
                    </button>
                    <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer">
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        Exportar CSV
                    </button>
                </div>
            </div>
        </div>
    );
}
