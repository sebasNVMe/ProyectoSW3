import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { getProfessionalsBySpeciality } from "../models/professional.model"
import { getAvailableSlots } from "../models/appointment.model"
import { SpecialityProfEnum, type Professional, type Specialty, type AppointmentSlot } from "../types"

// Metadatos de las especialidades 
export const SPECIALTIES: Specialty[] = [
    {
        value: SpecialityProfEnum.General,
        label: 'Medicina General',
        description: 'Valoración general para evaluar tu estado de salud y definir el tratamiento más adecuado.',
    },
    {
        value: SpecialityProfEnum.Physiotherapy,
        label: 'Fisioterapia',
        description: 'Recupera tu movilidad y alivia el dolor mediante ejercicios terapéuticos y técnicas físicas adaptadas a tus lesiones.',
    },
    {
        value: SpecialityProfEnum.Chiropractor,
        label: 'Quiropráctica',
        description: 'Terapia manual que alivia dolores articulares, mejora la postura y la movilidad corporal.',
    },
    {
        value: SpecialityProfEnum.Neural_Therapy,
        label: 'Terapia Neural',
        description: 'Alivia dolores e inflamaciones mediante pequeñas dosis anestésicas que regulan el sistema nervioso.',
    },
]

const ALL_DAYS = ["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"] as const

/** Convierte el string de días no laborales del backend (índices 0-6) a números de JS Date (0=Domingo,1=Lunes,...,6=Sábado) */
function parseUnavailableDaysToJsDays(raw: string | null): number[] {
    if (!raw) return []
    // Backend: 0=LUN,1=MAR,2=MIE,3=JUE,4=VIE,5=SAB,6=DOM
    // JS Date: 0=DOM,1=LUN,2=MAR,3=MIE,4=JUE,5=VIE,6=SAB
    const backendToJs: Record<number, number> = { 0: 1, 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 0 }
    return raw.split(",").map(n => backendToJs[Number(n.trim())]).filter(n => n !== undefined)
}

export function useAppointmentViewModel() {
    // Paso 1: Selección de la especialidad
    const [selectedSpeciality, setSelectedSpeciality] = useState<SpecialityProfEnum | null>(null)

    // Paso 2: Selección del profesional
    const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)

    // Paso 3: Selección de fecha y hora
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null)

    // Query de profesionales por especialidad
    const {
        data: professionals = [],
        isLoading: isLoadingProfessionals,
        isError: isErrorProfessionals,
    } = useQuery<Professional[]>({
        queryKey: ["professionals", "speciality", selectedSpeciality],
        queryFn: () => getProfessionalsBySpeciality(selectedSpeciality!),
        enabled: !!selectedSpeciality,
        retry: 1,
    })

    // Calcular días de la semana deshabilitados a partir del profesional seleccionado
    const disabledDaysOfWeek = useMemo<number[]>(() => {
        if (!selectedProfessional) return []
        // Siempre deshabilitar fines de semana (SAB=6, DOM=0 en JS)
        const unavailable = parseUnavailableDaysToJsDays(selectedProfessional.unavailableDays)
        // Agregar fin de semana si no están ya
        if (!unavailable.includes(0)) unavailable.push(0) // Domingo
        if (!unavailable.includes(6)) unavailable.push(6) // Sábado
        return unavailable
    }, [selectedProfessional])

    // Fecha formateada para la API (YYYY-MM-DD)
    const selectedDateStr = selectedDate
        ? selectedDate.toLocaleDateString('en-CA') // en-CA da formato YYYY-MM-DD
        : undefined

    // Query de slots disponibles
    const {
        data: availableSlots = [],
        isLoading: isLoadingSlots,
        isError: isErrorSlots,
    } = useQuery<AppointmentSlot[]>({
        queryKey: ["appointments", "slots", selectedProfessional?.codProf, selectedDateStr],
        queryFn: () => getAvailableSlots(selectedProfessional!.codProf, selectedDateStr!),
        enabled: !!selectedProfessional && !!selectedDateStr,
        retry: 1,
    })

    // Selecciona una especialidad y limpia los pasos siguientes 
    function handleSelectSpeciality(speciality: SpecialityProfEnum) {
        setSelectedSpeciality(speciality)
        setSelectedProfessional(null)
        setSelectedDate(undefined)
        setSelectedSlot(null)
    }

    // Selecciona un profesional y limpia los pasos siguientes 
    function handleSelectProfessional(professional: Professional) {
        setSelectedProfessional(professional)
        setSelectedDate(undefined)
        setSelectedSlot(null)
    }

    // Selecciona una fecha y limpia el slot 
    function handleSelectDate(date: Date | undefined) {
        setSelectedDate(date)
        setSelectedSlot(null)
    }

    // Selecciona un slot de hora 
    function handleSelectSlot(slot: AppointmentSlot) {
        setSelectedSlot(slot)
    }

    return {
        // Especialidades
        specialties: SPECIALTIES,
        selectedSpeciality,
        handleSelectSpeciality,

        // Profesionales
        professionals,
        isLoadingProfessionals,
        isErrorProfessionals,
        selectedProfessional,
        handleSelectProfessional,

        // Fecha y hora
        selectedDate,
        handleSelectDate,
        disabledDaysOfWeek,
        availableSlots,
        isLoadingSlots,
        isErrorSlots,
        selectedSlot,
        handleSelectSlot,
    }
}
