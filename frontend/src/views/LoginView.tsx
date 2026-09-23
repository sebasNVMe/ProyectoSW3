import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import ErrorMessage from "../components/ErrorMessage"
import type { LoginForm } from "../types"
import api from "../config/axios"



export default function LoginView() {

    const initialValues: LoginForm = {
        cedUser: 0,
        passwordUser: ''
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const navigate = useNavigate()

    const handleLogin = async (formData: LoginForm) => {
        try {
            const { data } = await api.post('/auth/login', formData)
            localStorage.setItem('AUTH_TOKEN', data)
            navigate('/')
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        }
    }

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="max-w-lg mx-auto bg-white px-10 py-10 rounded-2xl space-y-10 mt-10 shadow-xl"
                noValidate
            >

                <div>
                    <h1 className="text-2xl text-center text-black font-bold pb-2">Bienvenido de nuevo</h1>
                    <p className="text-lg text-center text-slate-500 mt-0">Ingresa a tu portal de salud piedrazul</p>
                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="cedUser" className="text-lg font-medium text-slate-800">Número de cedula</label>
                    <input
                        id="cedUser"
                        type="number"
                        placeholder="Ej: 12345678"
                        className="border-solid border p-3 rounded-xl placeholder-slate-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                        {...register("cedUser", {
                            required: "El número de cedula es obligatorio",
                        })}
                    />
                    {errors.cedUser && (
                        <ErrorMessage>{errors.cedUser.message}</ErrorMessage>
                    )}

                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <div className="flex justify-between items-center">
                        <label htmlFor="passwordUser" className="text-lg font-medium text-slate-800 ">Contraseña</label>
                        <Link to="/" className="text-sm text-custom-blue hover:underline">
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>
                    <input
                        id="passwordUser"
                        type="password"
                        placeholder="&#x25cf;&#x25cf;&#x25cf;&#x25cf;&#x25cf;&#x25cf;&#x25cf;"
                        className="border-solid border p-3 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                        {...register("passwordUser", {
                            required: "La contraseña es obligatoria",
                        })}
                    />
                    {errors.passwordUser && (
                        <ErrorMessage>{errors.passwordUser.message}</ErrorMessage>
                    )}

                </div>

                <input
                    type="submit"
                    className="bg-custom-blue p-3 text-lg w-full text-white rounded-lg font-semibold cursor-pointer"
                    value='Iniciar Sesión'
                />

                <nav className="mt-10 pb-2">
                    <Link
                        className="text-center text-slate-500 text-lg block"
                        to="/auth/register"
                    >¿Aún no tienes cuenta? <span className="text-custom-blue font-semibold">Regístrate aquí</span></Link>
                </nav>
            </form>
        </>
    )
}