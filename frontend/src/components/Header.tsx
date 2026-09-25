
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import HomeNavigation from "./HomeNavigation";
import UserNavigation from "./UserNavigation";


export default function Header() {

    const location = useLocation()

    return (
        <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                <div className="flex-shrink-0">
                    <Logo />
                </div>
                <nav className="flex items-center">
                    {location.pathname === '/' ? <HomeNavigation /> : <UserNavigation />}
                </nav>
            </div>
        </header>


    )
}
