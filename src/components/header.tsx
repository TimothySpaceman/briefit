import {Link} from "react-router-dom"
import {useAuth} from "@/hooks/useAuth"
import {logout} from "@/auth"
import {Button} from "@/components/ui/button"
import {ThemeToggle} from "./theme-toggle"
import {Spinner} from "@/components/ui/spinner.tsx";

export function Header() {
    const {user, loading} = useAuth()

    return (
        <header className="border-b bg-background w-full">
            <div className="mx-auto h-14 px-4 grid grid-cols-3 grid-rows-1 items-center">
                <h2 className="text-foreground text-3xl font-bold">Briefit</h2>

                <nav className="flex items-center gap-6 justify-self-center">
                    <Link to="/" className="font-semibold">
                        Головна
                    </Link>

                    {/*<Link to="/dashboard" className="text-muted-foreground hover:text-foreground">*/}
                    {/*    Dashboard*/}
                    {/*</Link>*/}

                    {/*{role === "admin" && (*/}
                    {/*    <Link to="/admin" className="text-muted-foreground hover:text-foreground">*/}
                    {/*        Admin*/}
                    {/*    </Link>*/}
                    {/*)}*/}
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