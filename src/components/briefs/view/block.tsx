import type {Block} from "@/lib/briefs.ts";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import Question from "@/components/briefs/view/question.tsx";
import {cn} from "@/lib/utils.ts";

type Props = {
    block: Block
    className?: string
}

export default function Block({block, className}: Props) {
    return <Card className={cn("w-full max-w-xl transition-shadow", className)}>
        <CardTitle className="px-4">
            <h2 className="text-xl font-bold">{block.title}</h2>
        </CardTitle>
        <CardContent className="flex flex-col gap-3">
            {block.questions.map(question => <Question key={`q-${question.id}`} question={question}/>)}
        </CardContent>
    </Card>
}