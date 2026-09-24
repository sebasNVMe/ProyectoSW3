import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import type { RegisterForm } from "../types"
import { registerUser } from "../models/auth.model"

export function useRegisterViewModel() {
    const initialValues: RegisterForm = {
        nameUser: '',
        lastNameUser: '',
        cedUser: 0,
        passwordUser: '',
        phoneUser: '',
        genderUser: '',
        roleUser: 'PATIENT',
    }

    const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

    const handleRegister = async (formData: RegisterForm) => {
        try {
            const message = await registerUser(formData)
            toast.success(message)
            reset()
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
        handleRegister
    }
}
