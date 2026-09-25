import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import type { RegisterProffesionalForm } from "../types"
import { registerProfessional } from "../models/professional.model"

export function useRegisterProfessionalViewModel() {
    const initialValues: RegisterProffesionalForm = {
        user: {
            codUser: 0,
            cedUser: 0,
            nameUser: '',
            lastNameUser: '',
            statusUser: '',
            roleUser: '',
            passwordUser: '',
            phoneUser: '',
            genderUser: '',
            securityQuestion: '',
            securityAnswer: '',
        },
        typeProf: '',
        specialityProf: '',
        arrivalTime: '',
        departureTime: '',
        attentionInterval: 0,
        passwordUser: '',
    }

    const { register, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const navigate = useNavigate()

    const handleRegister = async (formData: RegisterProffesionalForm) => {
        try {
            const parsedData: RegisterProffesionalForm = {
                ...formData,
                user: {
                    ...formData.user,
                    cedUser: Number(formData.user.cedUser),
                },
                attentionInterval: Number(formData.attentionInterval),
            }
            await registerProfessional(parsedData)
            toast.success('Profesional registrado correctamente')
            reset()
            navigate('/admin/config')
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                const message = error.response.data.message
                if (Array.isArray(message)) {
                    message.forEach((msg: string) => toast.error(msg))
                } else {
                    toast.error(message)
                }
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
