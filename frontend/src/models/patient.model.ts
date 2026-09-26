import api from "../config/axios"
import type { Patient } from "../types"

export async function registerPatient(cedUser: number): Promise<Patient> {
    const { data } = await api.post<Patient>('/patients', { cedUser })
    return data
}

export async function getPatientByCedula(cedUser: number): Promise<Patient | null> {
    try {
        const { data } = await api.get<Patient>(`/patients/${cedUser}`)
        return data
    } catch {
        return null
    }
}
