import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { isAxiosError } from "axios"
import type { RegisterForm } from "../types"
import ErrorMessage from "../components/ErrorMessage"
import api from "../config/axios"

export default function RegisterView() {

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
            const { data } = await api.post('/auth/register', formData)
            toast.success(data)
            reset()
        } catch (error) {
            if (isAxiosError(error) && error.response) {
                toast.error(error.response.data.error)
            }
        }
    }

    return (
        <div className="flex bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-[950px] mx-auto min-h-[600px] mb-10">
            {/* Panel izquierdo */}
            <div className="w-5/12 bg-[#1a1b3f] p-10 text-white flex flex-col relative overflow-hidden">
                <div className="relative z-10 space-y-8 mt-5">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>

                    <h1 className="text-3xl font-bold leading-snug tracking-wide">Únete a<br />Piedrazul</h1>

                    <ul className="space-y-6 mt-8">
                        <li className="flex gap-4">
                            <div className="mt-1">
                                <div className="w-5 h-5 rounded-full bg-custom-blue flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                            <p className="text-[15px] font-light text-slate-300 leading-relaxed">Agenda citas de forma autónoma 24/7.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1">
                                <div className="w-5 h-5 rounded-full bg-custom-blue flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                            <p className="text-[15px] font-light text-slate-300 leading-relaxed">Accede a tu historial de consultas.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1">
                                <div className="w-5 h-5 rounded-full bg-custom-blue flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                            <p className="text-[15px] font-light text-slate-300 leading-relaxed">Recibe recordatorios automáticos.</p>
                        </li>
                    </ul>
                </div>

                {/* Decoraciones del fondo */}
                <div className="absolute -bottom-12 -left-6 opacity-10 pointer-events-none text-white">
                    <svg width="250" height="250" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.5 6.5h-1V3h-2v3.5h-3.5v2h3.5v3.5h2v-3.5h3.5v-2h-2.5z" />
                        <path d="M21.5 13.5v-2h-3v-3h-2v3h-3v2h3v3h2v-3h3z" />
                        <path d="M19 16.5c-2.5 0-4.5 2-4.5 4.5h2c0-1.38 1.12-2.5 2.5-2.5v-2z" />
                        <path d="M5 16.5c-1.38 0-2.5 1.12-2.5 2.5h2c0-2.5 2-4.5 4.5-4.5v-2c-2.21 0-4 1.79-4 4z" />
                        <path d="M3.72 15C1.64 15 0 16.64 0 18.72S1.64 22.44 3.72 22.44H20.28c2.08 0 3.72-1.64 3.72-3.72S22.36 15 20.28 15h-16.56zm14.36 5H5.92c-.99 0-1.8-.81-1.8-1.8s.81-1.8 1.8-1.8h12.16c.99 0 1.8.81 1.8 1.8s-.81 1.8-1.8 1.8z" />
                    </svg>
                </div>
            </div>

            {/* Panel derecho */}
            <div className="w-7/12 py-10 px-12 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-slate-800">Crear nueva cuenta</h2>
                <p className="text-slate-500 mt-1 text-sm">Completa tus datos para empezar.</p>

                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="mt-8 space-y-4"
                    noValidate
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label htmlFor="nameUser" className="text-[13px] font-bold text-slate-700">Nombres</label>
                            <input
                                id="nameUser"
                                type="text"
                                placeholder="Juan"
                                className="w-full bg-white border border-slate-300 p-2.5 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                {...register('nameUser', {
                                    required: "Los nombres son obligatorios"
                                })}
                            />
                            {errors.nameUser && <ErrorMessage>{errors.nameUser.message}</ErrorMessage>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="lastNameUser" className="text-[13px] font-bold text-slate-700">Apellidos</label>
                            <input
                                id="lastNameUser"
                                type="text"
                                placeholder="Pérez"
                                className="w-full bg-white border border-slate-300 p-2.5 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                {...register('lastNameUser', {
                                    required: "Los apellidos son obligatorios"
                                })}
                            />
                            {errors.lastNameUser && <ErrorMessage>{errors.lastNameUser.message}</ErrorMessage>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label htmlFor="cedUser" className="text-[13px] font-bold text-slate-700">Cédula</label>
                            <input
                                id="cedUser"
                                type="number"
                                placeholder="12345678"
                                className="w-full bg-white border border-slate-300 p-2.5 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                {...register('cedUser', {
                                    required: "La cédula es obligatoria",
                                    valueAsNumber: true,
                                })}
                            />
                            {errors.cedUser && <ErrorMessage>{errors.cedUser.message}</ErrorMessage>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="phoneUser" className="text-[13px] font-bold text-slate-700">Teléfono</label>
                            <input
                                id="phoneUser"
                                type="text"
                                placeholder="0412-0000000"
                                className="w-full bg-white border border-slate-300 p-2.5 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                {...register('phoneUser', {
                                    required: "El teléfono es obligatorio"
                                })}
                            />
                            {errors.phoneUser && <ErrorMessage>{errors.phoneUser.message}</ErrorMessage>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label htmlFor="genderUser" className="text-[13px] font-bold text-slate-700">Género</label>
                            <select
                                id="genderUser"
                                className="w-full bg-white border border-slate-300 p-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                {...register('genderUser', {
                                    required: "Selecciona un género"
                                })}
                            >
                                <option value="">Seleccionar...</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Otro">Otro</option>
                            </select>
                            {errors.genderUser && <ErrorMessage>{errors.genderUser.message}</ErrorMessage>}
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="passwordUser" className="text-[13px] font-bold text-slate-700">Contraseña</label>
                            <input
                                id="passwordUser"
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-white border border-slate-300 p-2.5 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                {...register('passwordUser', {
                                    required: "La contraseña es obligatoria",
                                    minLength: {
                                        value: 8,
                                        message: "La contraseña debe tener como mínimo 8 caracteres"
                                    }
                                })}
                            />
                            {errors.passwordUser && <ErrorMessage>{errors.passwordUser.message}</ErrorMessage>}
                        </div>
                    </div>

                    <div className="pt-3">
                        <input
                            type="submit"
                            className="w-full bg-custom-blue hover:bg-indigo-700 transition-colors py-3 text-white rounded-lg font-bold cursor-pointer"
                            value="Crear Cuenta"
                        />
                    </div>
                </form>

                <div className="mt-8 text-center text-[13px] text-slate-500">
                    ¿Ya tienes una cuenta?<br />
                    <Link to="/auth/login" className="text-custom-blue font-bold hover:underline mt-1 inline-block">Inicia Sesión</Link>
                </div>
            </div>
        </div>
    )
}