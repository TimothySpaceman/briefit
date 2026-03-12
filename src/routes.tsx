import type {RouteObject} from "react-router-dom"

import Home from "@/pages/index"
import Login from "@/pages/login"
import Register from "@/pages/register"
import Briefs from "./pages/briefs"
import BriefForm from "@/pages/brief-form.tsx";
import Submitted from "@/pages/submitted.tsx";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <Home/>,
    },

    {
        path: "/login",
        element: <Login/>,
    },

    {
        path: "/register",
        element: <Register/>,
    },

    {
        path: "/briefs",
        element: <Briefs/>,
    },

    {
        path: "/briefs/:id",
        element: <BriefForm/>,
    },

    {
        path: "/submitted",
        element: <Submitted/>,
    },

    // {
    //     path: "/dashboard",
    //     element: (
    //         <RequireAuth>
    //             <Dashboard/>
    //         </RequireAuth>
    //     ),
    // },
    //
    // {
    //     path: "/admin",
    //     element: (
    //         <RequireAuth role="admin">
    //             <Admin/>
    //         </RequireAuth>
    //     ),
    // },
]