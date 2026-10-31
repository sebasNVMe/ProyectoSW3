import axios, { isAxiosError } from "axios";
import { clearSession, getToken } from "../utils/session";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Un 401 en el login significa credenciales incorrectas, no sesión vencida
        const isLoginRequest = error.config?.url?.includes("/auth/login")

        if (isAxiosError(error) && error.response?.status === 401 && !isLoginRequest) {
            clearSession()
            window.location.assign("/auth/login")
        }
        return Promise.reject(error)
    }
)

export default api