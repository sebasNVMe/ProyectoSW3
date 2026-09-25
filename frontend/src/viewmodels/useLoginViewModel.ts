import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import type { LoginForm } from "../types"
import { loginUser } from "../models/auth.model"

export function useLoginViewModel() {
    const initialValues: LoginForm = {
        cedUser: 0,
        password: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const navigate = useNavigate()

    const handleLogin = async (formData: LoginForm) => {
        try {
            const parsedData = { ...formData, cedUser: Number(formData.cedUser) }
            const token = await loginUser(parsedData)
            console.log(token)
            localStorage.setItem('AUTH_TOKEN', token)
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
