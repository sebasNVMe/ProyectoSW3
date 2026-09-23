import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function HomeView() {
    return (
        <>
            <Header />
            <main>
                {/* Sección Principal */}
                <section className="bg-custom-blue py-10 min-h-[70vh] flex items-center bg-no-repeat bg-right-top lg:bg-home lg:bg-home-xl">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-28 w-full px-6 lg:px-8">
                        <div className="lg:w-7/12 space-y-8">
                            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                                Tu salud en manos expertas, a un clic de distancia.
                            </h1>
                            <p className="text-lg lg:text-xl text-white opacity-90">
                                Únete a la comunidad de Piedrazul. Regístrate hoy para gestionar tus citas de forma autónoma, segura y rápida.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Link
                                    className="bg-white text-custom-blue font-semibold py-3 px-6      rounded-lg transition hover:bg-gray-100 shadow-md"
                                    to='auth/register'
                                >Crear mi Cuenta
                                </Link>
                                <Link
                                    className="border border-white text-white font-semibold py-3 px-6 rounded-lg transition hover:bg-white hover:text-custom-blue"
                                    to='auth/login'
                                >Acceso Pacientes
                                </Link>
                            </div>
                        </div>
                        <div className="lg:w-5/12 w-full mt-10 lg:mt-0">
                            <img
                                className="rounded-2xl shadow-2xl w-full object-cover"
                                src="/centro_medico.png"
                                alt="imagen centro medico" />
                        </div>
                    </div>
                </section>

                {/* Sobre Piedrazul */}
                <section className="py-24 bg-custom-light" id="sobre-nosotros">
                    <div className="max-w-5xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Sobre Piedrazul</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                                Somos un centro médico de dedicado a brindar atención integral de alta calidad, combinado con la calidez humana. Nos enfocamos en tratar el origen de tus padecimientos a través de métodos respetuosos con tu organismo, promoviendo una sanación profunda, consciente y sin efectos secundarios agresivos.
                            </p>
                        </div>

                        {/* Características*/}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            {/* Carta 1 */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-3xl bg-indigo-100 flex items-center justify-center text-custom-blue">
                                    <img src="/lotus-icono.svg" alt="icono flor de loto"></img>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Medicina y Bienestar </h3>
                                    <p className="text-gray-600 text-sm">Contamos con terapias naturales de vanguardia y enfoques holísticos diseñados para restaurar el equilibrio de tu cuerpo y mente de forma complementaria.</p>
                                </div>
                            </div>

                            {/* Carta 2 */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-3xl bg-indigo-100 flex items-center justify-center text-custom-blue">
                                    <img src="/doctor-icono.svg" alt="icono doctor"></img>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Especialistas Experimentados</h3>
                                    <p className="text-gray-600 text-sm">Nuestro equipo médico está conformado por especialistas con amplia experiencia en diversas áreas.</p>
                                </div>
                            </div>

                            {/* Carta 3 */}
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="w-16 h-16 rounded-3xl bg-indigo-100 flex items-center justify-center ">
                                    <img src="/heartbeat.svg" alt="icono corazon"></img>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Compromiso Humano</h3>
                                    <p className="text-gray-600 text-sm">Priorizamos la empatía y la comunicación clara para asegurar que te sientas acompañado en cada paso.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Especialidades */}
                <section className="py-24 bg-white" id="especialidades">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <div className="text-center mb-16 space-y-3">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Nuestras Especialidades</h2>
                            <p className="text-gray-600 text-lg">Soluciones integrales de salud para ti y tu familia</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Carta Especialidad 1 */}
                            <div className="bg-custom-light rounded-3xl p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-1">
                                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-6 text-custom-blue">
                                    <img src="consulta-icono.svg" alt="icono consulta general"></img>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Consulta General</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Valoración general para evaluar tu estado de salud y definir el tratamiento más adecuado.</p>
                            </div>

                            {/* Carta Especialidad 2 */}
                            <div className="bg-custom-light rounded-3xl p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-1">
                                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-6 text-custom-blue">
                                    <img src="/neural-icono.svg" alt=""></img>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Terapia Neural</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Alivia dolores e inflamaciones mediante pequeñas dosis anestésicas que regulan el sistema nervioso.</p>
                            </div>

                            {/* Carta Especialidad 3 */}
                            <div className="bg-custom-light rounded-3xl p-8  text-center flex flex-col items-center transition-transform hover:-translate-y-1">
                                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-6 text-custom-blue">
                                    <img src="/quiropraxia-icono.svg" alt="icono quiropraxia"></img>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Quiropraxia</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Terapia manual que alivia dolores articulares, mejora la postura y la movilidad corporal.</p>
                            </div>

                            {/* Carta Especialidad 4 */}
                            <div className="bg-custom-light rounded-3xl p-8 text-center flex flex-col items-center transition-transform hover:-translate-y-1">
                                <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-6 text-custom-blue">
                                    <img src="/fisioterapia-icono.svg" alt="icono fisioterapia"></img>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Fisioterapia</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">Recupera tu movilidad y alivia el dolor mediante ejercicios terapéuticos y técnicas físicas adaptadas a tus lesiones.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <section className="py-16 bg-custom-dark text-white relative overflow-hidden">
                    <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-6 leading-tight">
                            ¿Listo para una mejor gestión de tu salud?
                        </h2>
                        <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
                            Regístrate en nuestro portal y accede a una forma más eficiente de cuidar de ti. Sin mensajes, sin esperas, 100% autónomo.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                className="bg-custom-blue text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-600 transition shadow-lg"
                                to='auth/register'>
                                Registrarme Ahora
                            </Link>
                            <Link
                                className="bg-transparent border border-gray-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-gray-800 transition"
                                to='auth/login'>
                                Entrar al Portal
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}