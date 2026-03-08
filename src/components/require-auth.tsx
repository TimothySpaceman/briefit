import {Navigate} from "react-router-dom"
import {useAuth} from "@/hooks/useAuth"

interface Props {
    children: React.ReactNode
    role?: "user" | "admin"
}

export function RequireAuth({children, role}: Props) {
    const {user, loading} = useAuth()

    if (loading) return <div>Loading...</div>

    if (!user) return <Navigate to="/login" replace/>

    if (role && role !== user.role) {
        return <Navigate to="/" replace/>
    }

    return <>{children}</>
}