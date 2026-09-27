import { useState, useMemo } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import { getProfessionalsBySpeciality } from "../models/professional.model"
import { getAvailableSlots, createAppointment } from "../models/appointment.model"
import { registerPatient, getPatientByCedula } from "../models/patient.model"
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

/** Convierte el string de días no laborales del backend (índices 0-6) a números de JS Date (0=Domingo,1=Lunes,...,6=Sábado) */
function parseUnavailableDaysToJsDays(raw: string | null): number[] {
    if (!raw) return []
    // Backend: 0=LUN, 1=MAR, ..., 6=DOM. JS Date: 0=DOM, 1=LUN, ..., 6=SAB.
    return raw.split(",").map(n => (Number(n.trim()) + 1) % 7)
}

// Lee el usuario autenticado, primero desde localStorage, luego del cache de React Query 
function getAuthUser(): { codUser: number; cedUser: number; nameUser: string; role: string } | undefined {
    try {
        const raw = localStorage.getItem('AUTH_USER')
        if (raw) return JSON.parse(raw)
    } catch {
        // ignorar JSON inválido
    }
    return undefined
}

export function useAppointmentViewModel() {
    const queryClient = useQueryClient()

    // Obtener codUser del usuario autenticado (localStorage > React Query cache)
    const authUser = getAuthUser() ?? queryClient.getQueryData<{ codUser: number; cedUser: number; nameUser: string; role: string }>(['user'])

    // Paso 1: Selección de la especialidad
    const [selectedSpeciality, setSelectedSpeciality] = useState<SpecialityProfEnum | null>(null)

    // Paso 2: Selección del profesional
    const [selectedProfessional, setSelectedProfessional] = useState<Professional | null>(null)

    // Paso 3: Selección de fecha y hora
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [selectedSlot, setSelectedSlot] = useState<AppointmentSlot | null>(null)

    // Paso 4: Mostrar resumen de confirmación
    const [showSummary, setShowSummary] = useState(false)

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

    // Mutación para confirmar/crear la cita
    const { mutate: confirmAppointment, isPending: isConfirming } = useMutation({
        mutationFn: createAppointment,
        onSuccess: () => {
            toast.success('¡Cita agendada exitosamente!')
            // Invalidar queries relacionadas para refrescar datos
            queryClient.invalidateQueries({ queryKey: ['appointments'] })
            // Limpiar todo el formulario
            resetAll()
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.message ?? 'Error al agendar la cita')
            } else {
                toast.error('Ocurrió un error inesperado al agendar la cita')
            }
        },
    })

    // Selecciona una especialidad y limpia los pasos siguientes 
    function handleSelectSpeciality(speciality: SpecialityProfEnum) {
        setSelectedSpeciality(speciality)
        setSelectedProfessional(null)
        setSelectedDate(undefined)
        setSelectedSlot(null)
        setShowSummary(false)
    }

    // Selecciona un profesional y limpia los pasos siguientes 
    function handleSelectProfessional(professional: Professional) {
        setSelectedProfessional(professional)
        setSelectedDate(undefined)
        setSelectedSlot(null)
        setShowSummary(false)
    }

    // Selecciona una fecha y limpia el slot 
    function handleSelectDate(date: Date | undefined) {
        setSelectedDate(date)
        setSelectedSlot(null)
        setShowSummary(false)
    }

    // Selecciona un slot de hora 
    function handleSelectSlot(slot: AppointmentSlot) {
        setSelectedSlot(slot)
        setShowSummary(false)
    }

    // Muestra el resumen de la cita (todos los datos seleccionados)
    function handleShowSummary() {
        if (selectedSpeciality && selectedProfessional && selectedDateStr && selectedSlot) {
            setShowSummary(true)
        }
    }

    // Volver al formulario para modificar datos
    function handleModify() {
        setShowSummary(false)
    }

    // Confirma y envía la cita al backend:
    // 1. Obtiene o crea al usuario como paciente
    // 2. Usa el codPatient resultante para crear la cita
    async function handleConfirm(onSuccessCallback?: () => void) {
        if (!selectedProfessional || !selectedDateStr || !selectedSlot || !authUser) {
            toast.error('Faltan datos para confirmar la cita. Por favor, inicia sesión nuevamente.')
            return
        }

        try {
            let codPatient: number

            // Intentar registrar al usuario como paciente
            try {
                const patient = await registerPatient(authUser.cedUser)
                codPatient = patient.codPatient
            } catch (registerError) {
                if (isAxiosError(registerError) && registerError.response?.status === 409) {
                    // Ya es paciente, buscar por cédula
                    const existing = await getPatientByCedula(authUser.cedUser)
                    if (!existing) {
                        toast.error('No se pudo obtener el registro de paciente. Intenta nuevamente.')
                        return
                    }
                    codPatient = existing.codPatient
                } else {
                    throw registerError
                }
            }

            // Agendar la cita con el codPatient obtenido
            confirmAppointment({
                codProf: selectedProfessional.codProf,
                codPatient,
                dateApp: selectedDateStr,
                timeApp: selectedSlot.timeApp,
            }, {
                onSuccess: () => {
                    if (onSuccessCallback) {
                        onSuccessCallback()
                    }
                }
            })
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.message ?? 'Error al preparar el registro de paciente')
            } else {
                toast.error('Ocurrió un error inesperado. Intenta nuevamente.')
            }
        }
    }

    // Limpia todo el estado del formulario
    function resetAll() {
        setSelectedSpeciality(null)
        setSelectedProfessional(null)
        setSelectedDate(undefined)
        setSelectedSlot(null)
        setShowSummary(false)
    }

    // Determina si todos los datos están listos para mostrar el botón de continuar
    const isReadyToConfirm =
        !!selectedSpeciality && !!selectedProfessional && !!selectedDateStr && !!selectedSlot

    // Label de la especialidad seleccionada
    const selectedSpecialtyLabel = SPECIALTIES.find(s => s.value === selectedSpeciality)?.label ?? ''

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

        // Resumen y confirmación
        showSummary,
        handleShowSummary,
        handleModify,
        handleConfirm,
        isConfirming,
        isReadyToConfirm,
        selectedSpecialtyLabel,
        selectedDateStr,
    }
}
