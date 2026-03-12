import type {Brief} from "@/lib/briefs";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    brief: Brief;
}

export default function BriefCard({brief}: Props) {
    return <Card className="w-full max-w-xl">
        <CardTitle className="px-4 flex justify-between items-center gap-6">
            <h2 className="text-2xl font-bold">{brief.title}</h2>
            <Button asChild>
                <Link to={`/briefs/${brief.id}`}>Заповнити</Link>
            </Button>
        </CardTitle>
        <CardContent>
            <p>{brief.description}</p>
        </CardContent>
    </Card>
}