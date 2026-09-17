
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import HomeNavigation from "./HomeNavigation";


export default function Header() {

    const location = useLocation()

    return (
        <header className="bg-white py-5">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
                <div className="w-full p-3 lg:p-0 md:w-1/3">
                    <Logo />
                </div>
                <nav className="md:w-1/3 md:flex md:justify-end">
                    {location.pathname === '/' ? <HomeNavigation /> : <AdminNavigation />}
                </nav>
                <nav className="md:w-1/3 md:flex md:justify-end">
                </nav>
            </div>
        </header>
    )
}