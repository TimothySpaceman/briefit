import {type Question, questionSchema} from "@/lib/briefs.ts";
import CheckboxQuestionBuilder from "@/components/briefs/build/checkbox-question.tsx";
import RadioQuestionBuilder from "@/components/briefs/build/radio-question.tsx";
import SelectQuestionBuilder from "@/components/briefs/build/select-question.tsx";
import TextQuestionBuilder from "@/components/briefs/build/text-question.tsx";
import {Field, FieldError, FieldLegend} from "@/components/ui/field.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "lucide-react";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Label} from "@/components/ui/label.tsx";

type Props = {
    question: Question;
    onChange: (newQuestion: Question) => void;
    onRemove: () => void;
    errors: Record<string, string>
}

const labels = {
    text: "Текст",
    radio: "Один варіант",
    checkbox: "Декілька варіантів",
    select: "Вибір зі списку"
}

export default function QuestionBuilder({question, onChange, onRemove, errors}: Props) {
    function handleRemove() {
        if (confirm(`Ви дійсно хочете видалити питання "${question.description}"?`)) {
            onRemove()
        }
    }

    return <div className="flex flex-col gap-1">
        <Field className="gap-0">
            <div className="flex items-end justify-between gap-2">
                <FieldLegend>Текст питання ({labels[question.type]})</FieldLegend>
                <Button className="mb-1" variant="destructive" size="icon-sm" onClick={handleRemove}>
                    <Trash/>
                </Button>
            </div>
            <Textarea
                name={`${question.id}-description`}
                value={question.description}
                onChange={e => onChange({...question, description: e.target.value})}
            />
            <FieldError>
                {errors.description}
            </FieldError>
        </Field>
        <div  className="flex gap-2 items-center">
            <Checkbox
                id={`${question.id}-isRequired`}
                name={`${question.id}-isRequired`}
                onCheckedChange={val => onChange({...question, required: val === true})}
                checked={question.required}
            />
            <Label
                htmlFor={`${question.id}-isRequired`}
                className="text-base font-normal"
            >
                Обовʼязкове
            </Label>
        </div>
        <InnerBuilder question={question} onChange={onChange} onRemove={onRemove} errors={errors}/>
    </div>
}

function InnerBuilder({question, onChange, errors}: Props & {errors: Record<string, string>}) {
    switch (question.type) {
        case "text":
            return <TextQuestionBuilder question={question} errors={errors} onChange={onChange}/>;
        case "checkbox":
            return <CheckboxQuestionBuilder question={question} errors={errors} onChange={onChange}/>;
        case "radio":
            return <RadioQuestionBuilder question={question} errors={errors} onChange={onChange}/>;
        case "select":
            return <SelectQuestionBuilder question={question} errors={errors} onChange={onChange}/>;
        default:
            return <></>;
    }
}