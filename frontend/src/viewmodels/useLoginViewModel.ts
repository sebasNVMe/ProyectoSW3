import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import type { LoginForm } from "../types"
import { loginUser } from "../models/auth.model"

export function useLoginViewModel() {
    const initialValues: LoginForm = {
        cedUser: 0,
        passwordUser: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const navigate = useNavigate()

    const handleLogin = async (formData: LoginForm) => {
        try {
            const token = await loginUser(formData)
            localStorage.setItem('AUTH_TOKEN', token)
            navigate('/dashboard')
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
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
