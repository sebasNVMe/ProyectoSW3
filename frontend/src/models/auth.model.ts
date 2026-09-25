import api from "../config/axios"
import type { LoginForm, RegisterForm } from "../types"

export async function loginUser(formData: LoginForm): Promise<string> {
    const { data } = await api.post('/auth/login', formData)
    return data.token
}

export async function registerUser(formData: RegisterForm): Promise<string> {
    const { data } = await api.post('/auth/register', formData)
    return data.message
}
