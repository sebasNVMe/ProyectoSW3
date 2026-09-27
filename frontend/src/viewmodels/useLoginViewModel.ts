import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import type { LoginForm } from "../types"
import { loginUser } from "../models/auth.model"

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
            console.log(loginResponse)
            localStorage.setItem('AUTH_TOKEN', loginResponse.token)
            localStorage.setItem('AUTH_USER', JSON.stringify({
                role: loginResponse.role,
                codUser: loginResponse.codUser,
                cedUser: loginResponse.cedUser,
                nameUser: loginResponse.nameUser,
            }))
            queryClient.setQueryData(['user'], {
                role: loginResponse.role,
                codUser: loginResponse.codUser,
                cedUser: loginResponse.cedUser,
                nameUser: loginResponse.nameUser
            })
            navigate('/schedule-appointment')
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
