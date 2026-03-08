import {Header} from "@/components/header.tsx";
import {useRoutes} from "react-router-dom";
import {routes} from "@/routes.tsx";

export default function App() {
    const router = useRoutes(routes)

    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header/>
            {router}
        </div>
    )
}