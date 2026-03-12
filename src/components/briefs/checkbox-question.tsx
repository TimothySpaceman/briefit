import type {BaseQuestion, CheckboxQuestion, Option} from "@/lib/briefs";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label.tsx";
import {useBriefForm} from "@/components/briefs/brief-form-context.tsx";

type Props = {
    question: BaseQuestion & CheckboxQuestion;
}

export default function CheckboxQuestion({question}: Props) {
    const {isLoading, answers, setAnswer} = useBriefForm();

    const value = answers[question.id] ?? [];

    function toggle(optionValue: string) {
        if (value?.includes(optionValue)) {
            setAnswer(question.id, value.filter((v: any) => v !== optionValue));
        } else {
            setAnswer(question.id, [...(value ?? []), optionValue]);
        }
    }

    const id = (option: Option) => `${question.id}-${option.value}`;

    return <div className="flex flex-col gap-1">
        {question.options.map((option) => (
            <div key={id(option)} className="flex gap-2 items-center">
                <Checkbox
                    id={id(option)}
                    name={question.id}
                    value={option.value}
                    onCheckedChange={() => toggle(option.value)}
                    checked={value.includes(option.value)}
                    disabled={isLoading}
                />
                <Label
                    htmlFor={id(option)}
                    className="text-base font-normal"
                >
                    {option.label}
                </Label>
            </div>
        ))}
    </div>
}