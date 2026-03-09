import {Header} from "@/components/header.tsx";
import {useRoutes} from "react-router-dom";
import {routes} from "@/routes.tsx";
import {Toaster} from "sonner";

export default function App() {
    const router = useRoutes(routes)

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header/>
            <main className="grow-1 flex flex-col">
                {router}
            </main>
            <Toaster/>
        </div>
    )
}