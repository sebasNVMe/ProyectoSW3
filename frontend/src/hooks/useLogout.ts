import { useNavigate } from "react-router-dom"
import { useQueryClient } from "@tanstack/react-query"
import { clearSession } from "../utils/session"

export default function useLogout() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return () => {
        clearSession()
        queryClient.clear()
        navigate("/auth/login", { replace: true })
    }
}