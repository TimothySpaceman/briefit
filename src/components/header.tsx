import {Link} from "react-router-dom"
import {useAuth} from "@/hooks/useAuth"
import {logout} from "@/auth"
import {Button} from "@/components/ui/button"
import {ThemeToggle} from "./theme-toggle"
import {Spinner} from "@/components/ui/spinner.tsx";

export function Header() {
    const {user, loading} = useAuth()

    return (
        <header className="border-b bg-background w-full sticky top-0 z-100">
            <div className="mx-auto h-14 px-4 grid grid-cols-3 grid-rows-1 items-center">
                <h2 className="text-foreground text-3xl font-bold">Briefit</h2>

                <nav className="flex items-center gap-6 justify-self-center">
                    <Link to="/" className="text-muted-foreground hover:text-foreground">
                        Головна
                    </Link>

                    <Link to="/briefs" className="text-muted-foreground hover:text-foreground">
                        Брифи
                    </Link>

                    {user && (
                        <Link to="/submissions" className="text-muted-foreground hover:text-foreground">
                            {user.role === "admin" ? "Подання" : "Мої подання"}
                        </Link>
                    )}
                </nav>

                <div className="flex items-center justify-self-end gap-3">
                    {loading && <Spinner className=""/>}

                    {!loading && (user ? (
                        <>
                            <div>
                                Вітаємо, {user.displayName}!
                            </div>
                            <Button onClick={logout}>
                                Вийти
                            </Button>
                        </>
                    ) : (
                        <Button asChild>
                            <Link to="/login">Увійти</Link>
                        </Button>
                    ))}

                    <ThemeToggle/>
                </div>
            </div>
        </header>
    )
}