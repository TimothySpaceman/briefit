import type {BaseQuestion, Option, RadioQuestion} from "@/lib/briefs.ts";
import {useBriefForm} from "@/components/briefs/view/brief-form-context.tsx";
import {Label} from "@/components/ui/label.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";

type Props = {
    question: BaseQuestion & RadioQuestion;
}

export default function RadioQuestion({question}: Props) {
    const {isLoading, isReadOnly, answers, setAnswer} = useBriefForm();

    const value = answers[question.id] ?? null;

    const id = (option: Option) => `${question.id}-${option.value}`;

    return <RadioGroup
        value={value}
        onValueChange={v => setAnswer(question.id, v)}
        required={question.required}
        disabled={isLoading}
        className="flex flex-col gap-1"
    >
        {question.options.map((option) => (
            <div key={id(option)} className="flex items-center gap-2">
                <RadioGroupItem
                    value={option.value}
                    id={id(option)}
                    disabled={isLoading || isReadOnly}
                />
                <Label
                    htmlFor={id(option)}
                    className="text-base font-normal"
                >
                    {option.label}
                </Label>
            </div>
        ))}
    </RadioGroup>
}