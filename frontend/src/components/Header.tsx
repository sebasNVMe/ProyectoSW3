
import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import HomeNavigation from "./HomeNavigation";
import UserNavigation from "./UserNavigation";

interface HeaderProps {
    navigation?: ReactNode;
    className?: string;
    logoSrc?: string;
}

export default function Header({ navigation, className, logoSrc }: HeaderProps) {

    const location = useLocation()

    const defaultNavigation = () => {
        if (location.pathname === '/') return <HomeNavigation />;
        return <UserNavigation />;
    }

    return (
        <header className={className ?? "bg-white py-4 shadow-sm sticky top-0 z-50"}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
                <div className="flex-shrink-0">
                    {logoSrc ? (
                        <Link to={'/'}>
                            <img src={logoSrc} className="w-40 block" alt="logo piedrazul" />
                        </Link>
                    ) : (
                        <Logo />
                    )}
                </div>
                <nav className="flex items-center">
                    {navigation ?? defaultNavigation()}
                </nav>
            </div>
        </header>
    )
}
