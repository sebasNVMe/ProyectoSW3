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
        password: ''
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
                className="max-w-lg mx-auto bg-white px-5 py-10 rounded-2xl space-y-10 mt-10 shadow-xl"
                noValidate
            >
                <h1 className="text-2xl text-center text-black font-bold font-sans">Bienvenido de nuevo</h1>
                <p className="text-lg text-center text-slate-500 font-sans">Ingresa a tu portal de salud piedrazul</p>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="cedUser" className="text-lg text-black">Número de cedula</label>
                    <input
                        id="cedUser"
                        type="number"
                        placeholder="Ej: 12345678"
                        className="border-solid border p-3 rounded-xl placeholder-slate-400"
                        {...register("cedUser", {
                            required: "El número de cedula es obligatorio",
                        })}
                    />
                    {errors.cedUser && (
                        <ErrorMessage>{errors.cedUser.message}</ErrorMessage>
                    )}

                </div>
                <div className="grid grid-cols-1 space-y-3">
                    <label htmlFor="password" className="text-lg text-black">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="&#x25cf;&#x25cf;&#x25cf;&#x25cf;&#x25cf;&#x25cf;&#x25cf;"
                        className="border-solid border p-3 rounded-xl placeholder-slate-400"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}

                </div>

                <input
                    type="submit"
                    className="bg-custom-blue p-3 text-lg w-full text-white rounded-lg font-sans font-semibold cursor-pointer"
                    value='Iniciar Sesión'
                />

                <nav className="mt-10">
                    <Link
                        className="text-center text-slate-500 text-lg block"
                        to="/auth/register"
                    >¿Aún no tienes una cuenta? <span className="text-custom-blue font-sans font-semibold">Registrate aquí </span></Link>
                </nav>
            </form>

        </>
    )
}