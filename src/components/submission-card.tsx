import type {Submission} from "@/lib/briefs";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/useAuth.ts";

type Props = {
    submission: Submission;
}

export default function SubmissionCard({submission}: Props) {
    const {user} = useAuth();
    const isOwn = user && user.id === submission.submitter?.id
    const submitter = isOwn ? "вас" : submission.submitter?.displayName ?? "анонімного користувача"

    return <Card className="w-full max-w-xl">
        <CardTitle className="px-4 flex justify-between items-center gap-6">
            <h2 className="text-2xl font-bold">{submission.brief.title}</h2>
            <Button asChild>
                <Link to={`/submissions/${submission.id}`}>Переглянути</Link>
            </Button>
        </CardTitle>
        <CardContent className="text-base">
            <p>Від {submitter}</p>
            <p className="text-muted-foreground">{submission.createdAt.toDate().toLocaleString()}</p>
        </CardContent>
    </Card>
}