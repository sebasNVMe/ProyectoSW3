type AppointmentRowProps = {
    hora: string;
    paciente: string;
    cedula: string;
    medico: string;
    especialidad: string;
    estado: "Pendiente" | "Confirmado" | "Cancelado";
};

const estadoConfig = {
    Pendiente: {
        dotColor: "bg-orange-400",
        textColor: "text-orange-500",
    },
    Confirmado: {
        dotColor: "bg-green-400",
        textColor: "text-green-600",
    },
    Cancelado: {
        dotColor: "bg-red-400",
        textColor: "text-red-500",
    },
};

const especialidadColors: Record<string, string> = {
    Cardiología: "bg-indigo-50 text-indigo-600 ring-indigo-200",
    Pediatría: "bg-pink-50 text-pink-600 ring-pink-200",
    Dermatología: "bg-amber-50 text-amber-600 ring-amber-200",
    Neurología: "bg-cyan-50 text-cyan-600 ring-cyan-200",
    Traumatología: "bg-emerald-50 text-emerald-600 ring-emerald-200",
};

export default function AppointmentRow({
    hora,
    paciente,
    cedula,
    medico,
    especialidad,
    estado,
}: AppointmentRowProps) {
    const { dotColor, textColor } = estadoConfig[estado];
    const especialidadStyle =
        especialidadColors[especialidad] ||
        "bg-slate-50 text-slate-600 ring-slate-200";

    return (
        <tr className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
            <td className="py-4 px-4 text-sm font-medium text-slate-700">
                {hora}
            </td>
            <td className="py-4 px-4 text-sm font-medium text-slate-800">
                {paciente}
            </td>
            <td className="py-4 px-4 text-sm text-slate-600 font-mono">
                {cedula}
            </td>
            <td className="py-4 px-4 text-sm text-slate-700">{medico}</td>
            <td className="py-4 px-4">
                <span
                    className={`inline-block text-xs font-medium px-3 py-1 rounded-full ring-1 ${especialidadStyle}`}
                >
                    {especialidad}
                </span>
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                    <span
                        className={`w-2 h-2 rounded-full ${dotColor}`}
                    ></span>
                    <span className={`text-sm font-medium ${textColor}`}>
                        {estado}
                    </span>
                </div>
            </td>
        </tr>
    );
}
