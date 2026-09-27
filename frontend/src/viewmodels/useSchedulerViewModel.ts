import { useState, useMemo, useCallback } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import {
    getAllAppointments,
    updateAppointmentStatus,
    cancelAppointment,
} from "../models/appointment.model"
import { getAllProfessionals } from "../models/professional.model"
import type { Appointment, Professional, StatusAppointment } from "../types"

export function useSchedulerViewModel() {
    const queryClient = useQueryClient()

    // Filtros para la busqueda
    const [filterCodProf, setFilterCodProf] = useState<number | null>(null)
    const [filterDate, setFilterDate] = useState<string>("")
    const [filterCedula, setFilterCedula] = useState<string>("")

    // Obtener las citas
    const {
        data: allAppointments = [],
        isLoading: isLoadingAppointments,
        isError: isErrorAppointments,
    } = useQuery<Appointment[]>({
        queryKey: ["scheduler", "appointments"],
        queryFn: getAllAppointments,
        retry: 1,
    })

    // Obtener profesionales
    const { data: professionals = [] } = useQuery<Professional[]>({
        queryKey: ["scheduler", "professionals"],
        queryFn: getAllProfessionals,
        retry: 1,
    })

    // Filtros para las citas
    const filteredAppointments = useMemo(() => {
        let result = allAppointments

        if (filterCodProf) {
            result = result.filter(
                (a) => a.professional?.codProf === filterCodProf
            )
        }

        if (filterDate) {
            result = result.filter((a) => a.dateApp === filterDate)
        }

        if (filterCedula.trim()) {
            const needle = filterCedula.trim().toLowerCase()
            result = result.filter((a) =>
                String(a.patient?.user?.cedUser ?? "")
                    .toLowerCase()
                    .includes(needle)
            )
        }

        // Ordenar por fecha (descendente) y luego por hora (ascendente)
        result = [...result].sort((a, b) => {
            const dateCmp = a.dateApp.localeCompare(b.dateApp)
            if (dateCmp !== 0) return -dateCmp
            return a.timeApp.localeCompare(b.timeApp)
        })

        return result
    }, [allAppointments, filterCodProf, filterDate, filterCedula])

    // ACtualizar el estado de una cita
    const { mutate: changeStatus, isPending: isChangingStatus } = useMutation({
        mutationFn: ({ id, status }: { id: number; status: StatusAppointment }) =>
            updateAppointmentStatus(id, status),
        onSuccess: () => {
            toast.success("Estado actualizado exitosamente")
            queryClient.invalidateQueries({ queryKey: ["scheduler", "appointments"] })
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.message ?? "Error al actualizar estado")
            } else {
                toast.error("Error inesperado al actualizar el estado")
            }
        },
    })

    // Cancelar una cita
    const { mutate: cancel, isPending: isCancelling } = useMutation({
        mutationFn: (id: number) => cancelAppointment(id),
        onSuccess: () => {
            toast.success("Cita cancelada exitosamente")
            queryClient.invalidateQueries({ queryKey: ["scheduler", "appointments"] })
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.message ?? "Error al cancelar la cita")
            } else {
                toast.error("Error inesperado al cancelar la cita")
            }
        },
    })

    // Acciones
    function handleFilter() {
        queryClient.invalidateQueries({ queryKey: ["scheduler", "appointments"] })
    }

    const handleExportCSV = useCallback(() => {
        if (filteredAppointments.length === 0) {
            toast.info("No hay citas para exportar")
            return
        }

        const headers = ["Código", "Fecha", "Hora", "Paciente", "Cédula", "Profesional", "Especialidad", "Estado"]
        const rows = filteredAppointments.map((a) => [
            a.codApp,
            a.dateApp,
            a.timeApp,
            `${a.patient?.user?.nameUser ?? ""} ${a.patient?.user?.lastNameUser ?? ""}`.trim(),
            a.patient?.user?.cedUser ?? "",
            `${a.professional?.user?.nameUser ?? ""} ${a.professional?.user?.lastNameUser ?? ""}`.trim(),
            a.professional?.specialityProf ?? "",
            a.statusApp,
        ])

        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(","))
            .join("\n")

        const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `citas_${filterDate || "todas"}_${Date.now()}.csv`
        link.click()
        URL.revokeObjectURL(url)
        toast.success("Archivo CSV exportado")
    }, [filteredAppointments, filterDate])

    // Fecha de visualización con formato 
    const displayDate = useMemo(() => {
        if (!filterDate) return "Todas las fechas"
        const [y, m, d] = filterDate.split("-")
        const date = new Date(Number(y), Number(m) - 1, Number(d))
        return date.toLocaleDateString("es-CO", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        })
    }, [filterDate])

    return {
        // Filtros
        filterCodProf,
        setFilterCodProf,
        filterDate,
        setFilterDate,
        filterCedula,
        setFilterCedula,
        handleFilter,

        // Datos
        professionals,
        appointments: filteredAppointments,
        totalAppointments: filteredAppointments.length,
        isLoadingAppointments,
        isErrorAppointments,
        displayDate,

        // Acciones
        changeStatus,
        isChangingStatus,
        cancel,
        isCancelling,
        handleExportCSV,
    }
}
