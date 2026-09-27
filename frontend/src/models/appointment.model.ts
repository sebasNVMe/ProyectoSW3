import api from "../config/axios"
import type { AppointmentSlot, CreateAppointmentPayload, Appointment, StatusAppointment } from "../types"

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

export async function getAllAppointments(): Promise<Appointment[]> {
    const { data } = await api.get<Appointment[]>('/appointments')
    return data
}

export async function getAppointmentsByDate(date: string): Promise<Appointment[]> {
    const { data } = await api.get<Appointment[]>(`/appointments/date/${date}`)
    return data
}

export async function getAppointmentsByProfessional(codProf: number): Promise<Appointment[]> {
    const { data } = await api.get<Appointment[]>(`/appointments/professional/${codProf}`)
    return data
}

export async function updateAppointmentStatus(id: number, statusApp: StatusAppointment): Promise<void> {
    await api.put(`/appointments/${id}/status`, { statusApp })
}

export async function cancelAppointment(id: number): Promise<void> {
    await api.delete(`/appointments/${id}`)
}
