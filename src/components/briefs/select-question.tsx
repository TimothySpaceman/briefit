import type {BaseQuestion, SelectQuestion} from "@/lib/briefs";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "../ui/select";
import {useBriefForm} from "./brief-form-context";

type Props = {
    question: BaseQuestion & SelectQuestion;
}

export default function SelectQuestion({question}: Props) {
    const {answers, setAnswer} = useBriefForm();

    const value = answers[question.id] ?? "";

    return <Select
        name={question.id}
        required={question.required}
        value={value}
        onValueChange={(val) => setAnswer(question.id, val)}
    >
        <SelectTrigger>
            <SelectValue placeholder="Оберіть відповідь..."/>
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                {question.options.map((option) => (
                    <SelectItem
                        key={`${question.id}-${option.value}`}
                        value={option.value}
                    >
                        {option.label}
                    </SelectItem>
                ))}
            </SelectGroup>
        </SelectContent>
    </Select>
}