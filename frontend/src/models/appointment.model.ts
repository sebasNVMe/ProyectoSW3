import api from "../config/axios"
import type { AppointmentSlot } from "../types"

export async function getAvailableSlots(codProf: number, date: string): Promise<AppointmentSlot[]> {
    const { data } = await api.get<AppointmentSlot[]>('/appointments/generated', {
        params: { codProf, date },
    })
    return data
}
