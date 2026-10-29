/*import { Link } from "react-router-dom";

export default function HomeNavigation() {
    return (
        <>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">

                <a
                    href="#sobre-nosotros"
                    className="text-slate-600 hover:text-custom-blue text-lg transition-colors"
                >
                    Sobre Nosotros
                </a>
                <a
                    href="#especialidades"
                    className="text-slate-600 hover:text-custom-blue text-lg transition-colors"
                >
                    Especialidades
                </a>

                <Link
                    className="text-slate-600 hover:text-custom-blue text-lg cursor-pointer"
                    to='auth/login'
                >Iniciar sesión</Link>

                <Link
                    className=" bg-custom-blue text-white py-2 px-6 font-semibold text-lg cursor-pointer rounded-md"
                    to='auth/register'
                >Registrarse</Link>
            </div>
        </>
    )
}*/

import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { ROLE_HOME } from "../config/roles";
import { getSession } from "../utils/session";

export default function HomeNavigation() {
    const session = getSession();

    return (
        <>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">

                <a
                    href="#sobre-nosotros"
                    className="text-slate-600 hover:text-custom-blue text-lg transition-colors"
                >
                    Sobre Nosotros
                </a>
                <a
                    href="#especialidades"
                    className="text-slate-600 hover:text-custom-blue text-lg transition-colors"
                >
                    Especialidades
                </a>

                {session ? (
                    <>
                        <LogoutButton className="text-slate-600 hover:text-custom-blue text-lg cursor-pointer transition-colors" />
                        <Link
                            className=" bg-custom-blue text-white py-2 px-6 font-semibold text-lg cursor-pointer rounded-md"
                            to={ROLE_HOME[session.user.role]}
                        >Ir a mi panel</Link>
                    </>
                ) : (
                    <>
                        <Link
                            className="text-slate-600 hover:text-custom-blue text-lg cursor-pointer"
                            to='/auth/login'
                        >Iniciar sesión</Link>

                        <Link
                            className=" bg-custom-blue text-white py-2 px-6 font-semibold text-lg cursor-pointer rounded-md"
                            to='/auth/register'
                        >Registrarse</Link>
                    </>
                )}
            </div>
        </>
    )
}