type ErrorMessageProps = {
    children: React.ReactNode
}

export default function ErrorMessage({ children }: ErrorMessageProps) {
    return (
        <p className="bg-red-50 text-red-600 p-3 text-sm font-semibold text-center rounded-xl">{children}</p>
    )
}


