import type {BaseQuestion, TextQuestion} from "@/lib/briefs";
import {Input} from "@/components/ui/input";
import {useBriefForm} from "@/components/briefs/brief-form-context.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import type {User} from "@/lib/auth.ts";
import {type ChangeEvent, useEffect} from "react";

type Props = {
    question: BaseQuestion & TextQuestion;
}

export default function TextQuestion({question}: Props) {
    const {isLoading, isReadOnly, autofill, answers, setAnswer} = useBriefForm();
    const {user} = useAuth();

    let defaultValue = (autofill && question.userSource && user) ? user[question.userSource as keyof User] : undefined;

    function handleChange(e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) {
        const value = e.currentTarget.value
        setAnswer(question.id, value.length > 0 ? value : undefined)
    }

    useEffect(() => {
        if(answers[question.id] || !defaultValue) return;
        setAnswer(question.id, defaultValue)
    }, [user])

    if (question.inputKind === "textarea") {
        return <Textarea
            value={answers[question.id] ?? defaultValue ?? ""}
            onChange={handleChange}
            name={question.id}
            required={question.required}
            minLength={question.minLength}
            disabled={isLoading || isReadOnly}
        />
    }

    return <Input
        value={answers[question.id] ?? defaultValue ?? ""}
        onChange={handleChange}
        name={question.id}
        type={question.inputKind}
        required={question.required}
        minLength={question.minLength}
        disabled={isLoading || isReadOnly}
        autoComplete="on"
    />
}