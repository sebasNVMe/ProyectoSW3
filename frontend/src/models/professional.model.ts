import api from "../config/axios"
import type { Professional, RegisterProffesionalForm } from "../types"

export async function registerProfessional(formData: RegisterProffesionalForm): Promise<string> {
    const userPayload = {
        cedUser: formData.user.cedUser,
        nameUser: formData.user.nameUser,
        lastNameUser: formData.user.lastNameUser,
        passwordUser: formData.passwordUser,
        phoneUser: formData.user.phoneUser,
        genderUser: formData.user.genderUser,
        roleUser: 'PROFESSIONAL',
    }
    await api.post('/auth/register', userPayload)

    const professionalPayload = {
        cedUser: formData.user.cedUser,
        typeProf: formData.typeProf,
        specialityProf: formData.specialityProf,
        arrivalTime: formData.arrivalTime,
        departureTime: formData.departureTime,
        attentionInterval: Number(formData.attentionInterval),
    }
    const { data } = await api.post('/professionals', professionalPayload)
    return data
}

export async function getAllProfessionals(): Promise<Professional[]> {
    const { data } = await api.get<Professional[]>('/professionals')
    return data
}

export async function updateProfessional(
    codProf: number,
    payload: {
        arrivalTime?: string
        departureTime?: string
        attentionInterval?: number
        unavailableDays?: string
    }
): Promise<Professional> {
    const { data } = await api.put<Professional>(`/professionals/${codProf}`, payload)
    return data
}

