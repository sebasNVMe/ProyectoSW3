import AppointmentRow from "./AppointmentRow";

const citasData = [
    {
        hora: "08:00 AM",
        paciente: "Laura Méndez",
        cedula: "V-23.456.789",
        medico: "Dra. Ana López",
        especialidad: "Cardiología",
        estado: "Pendiente" as const,
    },
    {
        hora: "09:30 AM",
        paciente: "Ricardo Gómez",
        cedula: "V-12.345.678",
        medico: "Dr. Carlos Ruiz",
        especialidad: "Pediatría",
        estado: "Confirmado" as const,
    },
    {
        hora: "10:00 AM",
        paciente: "Elena Sánchez",
        cedula: "V-15.678.901",
        medico: "Dra. María Torres",
        especialidad: "Dermatología",
        estado: "Pendiente" as const,
    },
];

export default function AppointmentsTable() {
    const totalCitas = 12;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Encabezado de la tabla */}
            <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800">
                    Listado de Citas –{" "}
                    <span className="text-slate-600 font-semibold">
                        07 Oct, 2026
                    </span>
                </h2>
                <span className="inline-flex items-center bg-indigo-50 text-custom-blue text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-full ring-1 ring-indigo-200">
                    {totalCitas} citas programadas
                </span>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/50">
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Hora
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Paciente
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Cédula
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Médico
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Especialidad
                            </th>
                            <th className="text-left py-3 px-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                Estado
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {citasData.map((cita, index) => (
                            <AppointmentRow key={index} {...cita} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
