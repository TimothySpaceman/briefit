import type {BaseQuestion, TextQuestion} from "@/lib/briefs";
import {Input} from "@/components/ui/input";
import {useBriefForm} from "@/components/briefs/brief-form-context.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import type {User} from "@/lib/auth.ts";

type Props = {
    question: BaseQuestion & TextQuestion;
}

export default function TextQuestion({question}: Props) {
    const {isLoading, isReadOnly, answers, setAnswer} = useBriefForm();
    const {user} = useAuth();

    let defaultValue = (question.userSource && user) ? user[question.userSource as keyof User] : "";

    if (question.inputKind === "textarea") {
        return <Textarea
            value={answers[question.id] ?? defaultValue}
            onChange={e => setAnswer(question.id, e.currentTarget.value)}
            name={question.id}
            required={question.required}
            minLength={question.minLength}
            disabled={isLoading || isReadOnly}
        />
    }

    return <Input
        value={answers[question.id] ?? defaultValue}
        onChange={e => setAnswer(question.id, e.currentTarget.value)}
        name={question.id}
        type={question.inputKind}
        required={question.required}
        minLength={question.minLength}
        disabled={isLoading || isReadOnly}
        autoComplete="on"
    />
}