import { useQuery } from "@tanstack/react-query"
import { getMe } from "../models/auth.model"
import type { UserProfile } from "../types"

export function useUser() {
    const hasToken = !!localStorage.getItem("AUTH_TOKEN")

    const { data: user, isLoading } = useQuery<UserProfile>({
        queryKey: ["user"],
        queryFn: getMe,
        enabled: hasToken,
        staleTime: 1000 * 60 * 5, // 5 minutos antes de re-validar
        retry: 1,
    })

    return { user, isLoading }
}
