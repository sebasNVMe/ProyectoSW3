import { Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import Logo from "../components/Logo"
export default function AuthLayout() {
    return (
        <>
            <div className="bg-custom-light min-h-screen">
                <div className="max-w-5xl mx-auto pt-10 px-5">
                    <div className="py-10">
                        <Outlet />
                    </div>
                </div>
            </div>
            <Toaster position='top-right' />
        </>
    )
}