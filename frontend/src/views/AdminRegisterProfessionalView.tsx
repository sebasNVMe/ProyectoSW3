import { UserIcon, ClockIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { useRegisterProfessionalViewModel } from "../viewmodels/useRegisterProfessionalViewModel";

export default function AdminRegisterProfessionalView() {
    const { register, handleSubmit, errors, handleRegister } = useRegisterProfessionalViewModel();

    return (
        <div className="animate-fade-in pb-12 max-w-5xl mx-auto">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">Registrar Nuevo Profesional</h2>
                </div>
            </div>

            {/* Formulario */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
                <form onSubmit={handleSubmit(handleRegister)} noValidate>

                    {/* Datos Personales */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-6">
                            <UserIcon className="w-5 h-5 text-blue-600 font-bold" />
                            <h3 className="text-lg font-bold text-slate-800">Datos Personales</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                                <label htmlFor="nameUser" className="text-[13px] font-bold text-slate-700">Nombre</label>
                                <input
                                    id="nameUser"
                                    type="text"
                                    placeholder="Ej: Alejandro"
                                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg text-sm placeholder-slate-500 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                    {...register('user.nameUser', { required: "Los nombres son obligatorios" })}
                                />
                                {errors.user?.nameUser && <ErrorMessage>{errors.user.nameUser.message}</ErrorMessage>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="lastNameUser" className="text-[13px] font-bold text-slate-700">Apellido</label>
                                <input
                                    id="lastNameUser"
                                    type="text"
                                    placeholder="Ej: Martínez"
                                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg text-sm placeholder-slate-500 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                    {...register('user.lastNameUser', { required: "Los apellidos son obligatorios" })}
                                />
                                {errors.user?.lastNameUser && <ErrorMessage>{errors.user.lastNameUser.message}</ErrorMessage>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="cedUser" className="text-[13px] font-bold text-slate-700">Cédula</label>
                                <input
                                    id="cedUser"
                                    type="number"
                                    placeholder="12345678"
                                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg text-sm placeholder-slate-500 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    {...register('user.cedUser', { required: "La cédula es obligatoria", valueAsNumber: true })}
                                />
                                {errors.user?.cedUser && <ErrorMessage>{errors.user.cedUser.message}</ErrorMessage>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="genderUser" className="text-[13px] font-bold text-slate-700">Género</label>
                                <select
                                    id="genderUser"
                                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                    {...register('user.genderUser', { required: "Selecciona un género" })}
                                >
                                    <option value="">Seleccione...</option>
                                    <option value="Masculino">Masculino</option>
                                    <option value="Femenino">Femenino</option>
                                    <option value="Otro">Otro</option>
                                </select>
                                {errors.user?.genderUser && <ErrorMessage>{errors.user.genderUser.message}</ErrorMessage>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="phoneUser" className="text-[13px] font-bold text-slate-700">Teléfono</label>
                                <input
                                    id="phoneUser"
                                    type="text"
                                    placeholder="04125555555"
                                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg text-sm placeholder-slate-500 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                    {...register('user.phoneUser', { required: "El teléfono es obligatorio" })}
                                />
                                {errors.user?.phoneUser && <ErrorMessage>{errors.user.phoneUser.message}</ErrorMessage>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="passwordUser" className="text-[13px] font-bold text-slate-700">Contraseña Inicial</label>
                                <input
                                    id="passwordUser"
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg text-sm placeholder-slate-500 text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                    {...register('passwordUser', {
                                        required: "La contraseña es obligatoria",
                                        minLength: { value: 8, message: "La contraseña debe tener como minímo 8 caracteres" }
                                    })}
                                />
                                {errors.passwordUser && <ErrorMessage>{errors.passwordUser.message}</ErrorMessage>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-100 my-8"></div>

                    {/* Perfil y Horarios Profesionales */}
                    <div className="mb-10">
                        <div className="flex items-center gap-2 mb-6">
                            <UserIcon className="w-5 h-5 text-blue-600 font-bold" />
                            <h3 className="text-lg font-bold text-slate-800">Perfil y Horarios Profesionales</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-1.5">
                                <label htmlFor="professionalType" className="text-[13px] font-bold text-slate-700">Tipo de Profesional</label>
                                <select
                                    id="professionalType"
                                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                    {...register('typeProf', { required: "Selecciona un tipo" })}
                                >
                                    <option value="">Seleccione Tipo...</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Therapist">Terapeuta</option>
                                </select>
                                {errors.typeProf && <ErrorMessage>{errors.typeProf.message}</ErrorMessage>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="specialty" className="text-[13px] font-bold text-slate-700">Especialidad</label>
                                <select
                                    id="specialty"
                                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                    {...register('specialityProf', { required: "Selecciona una especialidad" })}
                                >
                                    <option value="">Seleccione Especialidad...</option>
                                    <option value="Neural_Therapy">Terapia Neural</option>
                                    <option value="Chiropractor">Quiropráctica</option>
                                    <option value="Physiotherapy">Fisioterapia</option>
                                    <option value="General">General</option>
                                </select>
                                {errors.specialityProf && <ErrorMessage>{errors.specialityProf.message}</ErrorMessage>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="attentionInterval" className="text-[13px] font-bold text-slate-700">Intervalo Atención (Minutos)</label>
                                <input
                                    id="attentionInterval"
                                    type="number"
                                    placeholder="ej: 5"
                                    className="w-full bg-white border border-gray-200 p-2.5 rounded-lg text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                    {...register('attentionInterval', {
                                        required: "EL intervalo de atención es obligatorio",
                                    })}
                                />
                                {errors.attentionInterval && <ErrorMessage>{errors.attentionInterval.message}</ErrorMessage>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="startTime" className="text-[13px] font-bold text-slate-700">Hora de Entrada (HH:mm)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ClockIcon className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        id="startTime"
                                        type="time"
                                        className="w-full bg-white border border-gray-200 p-2.5 pl-9 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                        {...register('arrivalTime', { required: "Hora de entrada es obligatoria" })}
                                    />
                                </div>
                                {errors.arrivalTime && <ErrorMessage>{errors.arrivalTime.message}</ErrorMessage>}
                            </div>

                            <div className="space-y-1.5">
                                <label htmlFor="endTime" className="text-[13px] font-bold text-slate-700">Hora de Salida (HH:mm)</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <ClockIcon className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <input
                                        id="endTime"
                                        type="time"
                                        className="w-full bg-white border border-gray-200 p-2.5 pl-9 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                                        {...register('departureTime', { required: "Hora de salida es obligatoria" })}
                                    />
                                </div>
                                {errors.departureTime && <ErrorMessage>{errors.departureTime.message}</ErrorMessage>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-100 my-8"></div>

                    {/* Guardar Profesionar */}
                    <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-6">
                        <Link
                            to="/admin/config"
                            className="w-full sm:w-auto px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors text-center"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            className="w-full sm:w-auto bg-[#4b3cfa] hover:bg-indigo-700 text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-colors shadow-sm"
                        >
                            Registrar Profesional
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
