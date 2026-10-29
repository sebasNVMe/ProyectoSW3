import useLogout from "../hooks/useLogout";

type LogoutButtonProps = {
    className?: string;
};

export default function LogoutButton({ className }: LogoutButtonProps) {
    const logout = useLogout();

    return (
        <button
            type="button"
            onClick={logout}
            className={className ?? "px-4 py-2 rounded-md text-sm font-medium transition-colors"}
        >
            Cerrar sesión
        </button>
    );
}