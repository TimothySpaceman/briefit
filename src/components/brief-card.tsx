import type {Brief} from "@/lib/briefs";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import type {ReactNode} from "react";

type Props = {
    brief: Brief;
    actions?: ReactNode
}

export default function BriefCard({brief, actions}: Props) {
    return <Card className="w-full max-w-xl">
        <CardTitle className="px-4 flex justify-end items-center gap-6">
            <h2 className="text-2xl font-bold ml-0 mr-auto">{brief.title}</h2>
            {actions}
        </CardTitle>
        <CardContent>
            <p>{brief.description}</p>
        </CardContent>
    </Card>
}