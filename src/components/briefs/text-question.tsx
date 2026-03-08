import type {BaseQuestion, TextQuestion} from "@/lib/briefs";
import {Input} from "@/components/ui/input";
import {useBriefForm} from "@/components/briefs/brief-form-context.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

type Props = {
    question: BaseQuestion & TextQuestion;
}

export default function TextQuestion({question}: Props) {
    const {answers, setAnswer} = useBriefForm();

    if (question.inputKind === "textarea") {
        return <Textarea
            value={answers[question.id] ?? ""}
            onChange={e => setAnswer(question.id, e.currentTarget.value)}
            name={question.id}
            required={question.required}
            minLength={question.minLength}
        />
    }

    return <Input
        value={answers[question.id] ?? ""}
        onChange={e => setAnswer(question.id, e.currentTarget.value)}
        name={question.id}
        type={question.inputKind}
        required={question.required}
        minLength={question.minLength}
        autoComplete="on"
    />
}