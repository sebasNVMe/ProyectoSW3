import api from "../config/axios"
import type { AppointmentSlot, CreateAppointmentPayload, Appointment } from "../types"

export async function getAvailableSlots(codProf: number, date: string): Promise<AppointmentSlot[]> {
    const { data } = await api.get<AppointmentSlot[]>('/appointments/generated', {
        params: { codProf, date },
    })
    return data
}

export async function createAppointment(payload: CreateAppointmentPayload): Promise<void> {
    await api.post('/appointments', payload)
}

export async function getAppointmentsByPatient(codPatient: number): Promise<Appointment[]> {
    const { data } = await api.get<Appointment[]>(`/appointments/patient/${codPatient}`)
    return data
}
