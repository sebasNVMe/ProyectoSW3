import { Link } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { useRegisterViewModel } from "../viewmodels/useRegisterViewModel"
export default function RegisterView() {
    const { register, handleSubmit, errors, handleRegister } = useRegisterViewModel()

    return (
        <div className="flex bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-[950px] mx-auto min-h-[600px] mb-10">
            {/* Panel izquierdo */}
            <div className="w-5/12 bg-[#1a1b3f] p-10 text-white flex flex-col relative overflow-hidden">
                <div className="relative z-10 space-y-8 mt-5">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                        <svg width="64px" height="64px" viewBox="-7.2 -7.2 38.40 38.40" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.94286 3C7.52858 3 5.57143 4.95716 5.57143 7.37143C5.57143 9.7857 7.52858 11.7429 9.94286 11.7429C12.3571 11.7429 14.3143 9.7857 14.3143 7.37143C14.3143 4.95716 12.3571 3 9.94286 3Z" fill="#ffffff"></path> <path d="M12.5226 13.6877C10.8136 13.4149 9.07213 13.4149 7.36313 13.6877L7.17994 13.7169C4.77189 14.1012 3 16.1783 3 18.6168C3 19.933 4.06698 21 5.38317 21H14.5025C15.8187 21 16.8857 19.933 16.8857 18.6168C16.8857 16.1783 15.1138 14.1012 12.7058 13.7169L12.5226 13.6877Z" fill="#ffffff"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1714 9.17143C18.5975 9.17143 18.9429 9.51681 18.9429 9.94286V11.2286H20.2286C20.6546 11.2286 21 11.574 21 12C21 12.426 20.6546 12.7714 20.2286 12.7714H18.9429V14.0571C18.9429 14.4832 18.5975 14.8286 18.1714 14.8286C17.7454 14.8286 17.4 14.4832 17.4 14.0571V12.7714H16.1143C15.6882 12.7714 15.3429 12.426 15.3429 12C15.3429 11.574 15.6882 11.2286 16.1143 11.2286H17.4V9.94286C17.4 9.51681 17.7454 9.17143 18.1714 9.17143Z" fill="#ffffff"></path> </g></svg>
                    </div>

                    <h1 className="text-3xl font-bold leading-snug tracking-wide">Únete a<br />Piedrazul</h1>

                    <ul className="space-y-6 mt-8">
                        <li className="flex gap-4">
                            <div className="mt-1">
                                <div className="w-5 h-5 rounded-full bg-indigo-400 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-custom-dark" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                            <p className="text-[15px] font-light text-slate-300 leading-relaxed">Agenda citas de forma autónoma 24/7.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1">
                                <div className="w-5 h-5 rounded-full bg-indigo-400 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-custom-dark" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                            <p className="text-[15px] font-light text-slate-300 leading-relaxed">Accede a tu historial de consultas.</p>
                        </li>
                        <li className="flex gap-4">
                            <div className="mt-1">
                                <div className="w-5 h-5 rounded-full bg-indigo-400 flex items-center justify-center">
                                    <svg className="w-3 h-3 text-custom-dark" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                </div>
                            </div>
                            <p className="text-[15px] font-light text-slate-300 leading-relaxed">Recibe recordatorios automáticos.</p>
                        </li>
                    </ul>
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
                                className="w-full bg-white border border-slate-300 p-2.5 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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