import type {RouteObject} from "react-router-dom"

import Home from "@/pages/index"
import Login from "@/pages/login"
import Register from "@/pages/register"
import Briefs from "./pages/briefs"
import BriefForm from "@/pages/brief-form.tsx";
import Submitted from "@/pages/submitted.tsx";
import Submissions from "@/pages/sumbissions.tsx";
import SubmissionForm from "@/pages/sumbission-form.tsx";
import {RequireAuth} from "@/components/require-auth.tsx";
import NewBrief from "@/pages/brief-new.tsx";
import EditBriefPage from "@/pages/brief-edit.tsx";
import NotFound from "@/pages/not-found.tsx";

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

    {
        path: "/submissions",
        element: <RequireAuth>
            <Submissions/>
        </RequireAuth>,
    },

    {
        path: "/submissions/:id",
        element: <RequireAuth>
            <SubmissionForm/>
        </RequireAuth>,
    },

    {
        path: "/briefs/new",
        element: <RequireAuth role="admin">
            <NewBrief/>
        </RequireAuth>,
    },

    {
        path: "/briefs/:id/edit",
        element: <RequireAuth role="admin">
            <EditBriefPage/>
        </RequireAuth>,
    },

    {
        path: "*",
        element: <NotFound/>
    }

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