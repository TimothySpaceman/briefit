import type {Block} from "@/lib/briefs.ts";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import Question from "@/components/briefs/question.tsx";

type Props = {
    block: Block
}

export default function Block({block}: Props) {
    return <Card className="w-full max-w-xl">
        <CardTitle className="px-4">
            <h2 className="text-xl font-bold">{block.title}</h2>
        </CardTitle>
        <CardContent className="flex flex-col gap-3">
            {block.questions.map(question => <Question key={`q-${question.id}`} question={question}/>)}
        </CardContent>
    </Card>
}