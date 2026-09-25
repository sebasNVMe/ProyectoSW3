import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useState, useEffect, useCallback } from "react"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import { getAllProfessionals, updateProfessional } from "../models/professional.model"
import type { Professional } from "../types"

const ALL_DAYS = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"] as const
type DayLabel = (typeof ALL_DAYS)[number]

/* Convierte el string de dias no laborales del backend (que va de 0 a 6) en etiquetas (como LUN) */
function unavailableToSet(raw: string | null): Set<DayLabel> {
    if (!raw) return new Set()
    return new Set(
        raw
            .split(",")
            .map((number) => ALL_DAYS[Number(number.trim())])
            .filter(Boolean)
    )
}

/** Convierte las etiquetas de dias no laborales al formato del backend. */
function setToUnavailable(days: Set<DayLabel>): string {
    return ALL_DAYS.filter((day) => days.has(day))
        .map((day) => ALL_DAYS.indexOf(day).toString())
        .join(",")
}

export type ProfessionalDraft = {
    codProf: number
    name: string
    speciality: string
    arrivalTime: string
    departureTime: string
    attentionInterval: number
    unavailableDays: Set<DayLabel>
    dirty: boolean
}

function toDraft(professional: Professional): ProfessionalDraft {
    return {
        codProf: professional.codProf,
        name: professional.user
            ? `${professional.user.nameUser} ${professional.user.lastNameUser}`
            : `Profesional #${professional.codProf}`,
        speciality: professional.specialityProf,
        arrivalTime: (professional.arrivalTime ?? "08:00").slice(0, 5),
        departureTime: (professional.departureTime ?? "17:00").slice(0, 5),
        attentionInterval: professional.attentionInterval,
        unavailableDays: unavailableToSet(professional.unavailableDays),
        dirty: false,
    }
}

export function useAdminConfigViewModel() {
    const queryClient = useQueryClient()

    // Ventana de agendamiento
    const [schedulingWeeks, setSchedulingWeeks] = useState(4)

    // Profesionales traídos del backend
    const { data: professionals, isLoading, isError, } = useQuery<Professional[]>({
        queryKey: ["professionals"],
        queryFn: getAllProfessionals,
        retry: 1,
    })

    // Copias locales de los profesionales
    const [drafts, setDrafts] = useState<ProfessionalDraft[]>([])

    useEffect(() => {
        if (professionals) {
            setDrafts(professionals.map(toDraft))
        }
    }, [professionals])

    // Mutaciones
    const updateDraft = useCallback(
        (codProf: number, patch: Partial<Omit<ProfessionalDraft, "codProf" | "name" | "speciality" | "dirty">>) => {
            setDrafts((prev) =>
                prev.map((d) => (d.codProf === codProf ? { ...d, ...patch, dirty: true } : d))
            )
        },
        []
    )

    const toggleDay = useCallback((codProf: number, day: DayLabel) => {
        setDrafts((prev) =>
            prev.map((d) => {
                if (d.codProf !== codProf) return d
                const next = new Set(d.unavailableDays)
                if (next.has(day)) next.delete(day)
                else next.add(day)
                return { ...d, unavailableDays: next, dirty: true }
            })
        )
    }, [])

    // Guardar las mutaciones
    const mutation = useMutation({
        mutationFn: async (draft: ProfessionalDraft) => {
            return updateProfessional(draft.codProf, {
                arrivalTime: draft.arrivalTime,
                departureTime: draft.departureTime,
                attentionInterval: draft.attentionInterval,
                unavailableDays: setToUnavailable(draft.unavailableDays),
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["professionals"] })
        },
    })

    const saveAll = useCallback(async () => {
        const dirtyDrafts = drafts.filter((d) => d.dirty)
        if (dirtyDrafts.length === 0) {
            toast.info("No hay cambios pendientes")
            return
        }
        try {
            await Promise.all(dirtyDrafts.map((d) => mutation.mutateAsync(d)))
            toast.success("Cambios guardados correctamente")
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                const message = error.response.data.message
                if (Array.isArray(message)) {
                    message.forEach((msg: string) => toast.error(msg))
                } else {
                    toast.error(message)
                }
            } else {
                toast.error("Error al guardar los cambios")
            }
        }
    }, [drafts, mutation])

    return {
        // Parámetros globales
        schedulingWeeks,
        setSchedulingWeeks,
        // Profesionales
        drafts,
        isLoading,
        isError,
        isSaving: mutation.isPending,
        // Acciones
        updateDraft,
        toggleDay,
        saveAll,
        ALL_DAYS,
    }
}
