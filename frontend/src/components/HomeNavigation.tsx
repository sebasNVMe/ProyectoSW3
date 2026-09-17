import { Link } from "react-router-dom";

export default function HomeNavigation() {
    return (
        <>
            <Link
                className="text-slate-400 p-2 font-bold font-sans text-lg cursor-pointer"
                to='auth/login'
            >Iniciar sesión</Link>
            <Link
                className=" bg-custom-blue text-white py-2 px-6 font-bold font-sans text-lg cursor-pointer rounded-md"
                to='auth/register'
            >Registrarse</Link>
        </>
    )
}