import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import type { LoginForm } from "../types"
import { loginUser, getMe } from "../models/auth.model"
import { ROLE_HOME, type Role } from "../config/roles"

export function useLoginViewModel() {
    const initialValues: LoginForm = {
        cedUser: '' as unknown as number,
        password: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const handleLogin = async (formData: LoginForm) => {
        try {
            const parsedData = { ...formData, cedUser: Number(formData.cedUser) }
            const loginResponse = await loginUser(parsedData)

            // Solo guardar el token en localStorage
            localStorage.setItem('AUTH_TOKEN', loginResponse.token)

            // Obtener el perfil del usuario desde /auth/me y cachearlo en React Query
            const userProfile = await getMe()
            queryClient.setQueryData(['user'], userProfile)

            navigate(ROLE_HOME[userProfile.role as Role], { replace: true })
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.message)
            }
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        handleLogin
    }
}
