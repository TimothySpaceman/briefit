import type {BaseQuestion, Question, TextQuestion} from "@/lib/briefs.ts";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {Field, FieldLegend} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";

type Props = {
    question: BaseQuestion & TextQuestion;
    onChange: (question: Question) => void;
}

type InputKind = "text" | "email" | "address" | "phone" | "textarea";

const inputKinds: InputKind[] = ["text", "textarea", "email", "address", "phone"]

const inputKindLabels: any = {
    text: "Текст (короткий)",
    textarea: "Текст (довгий)",
    email: "Email",
    address: "Адреса",
    phone: "Телефон"
}

const userSources = ["NONE", "email", "displayName"]

const userSourcesLabels: any = {
    NONE: "Без автозаповнення",
    email: "Email користувача",
    displayName: "Імʼя користувача"
}

export default function TextQuestionBuilder({question, onChange}: Props) {
    return <>
        <Field className="gap-0">
            <FieldLegend>Вид поля</FieldLegend>
            <Select
                name={`${question.id}-inputKind`}
                value={question.inputKind}
                onValueChange={(val) => onChange({...question, inputKind: val as InputKind})}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Оберіть відповідь..."/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {inputKinds.map((option) => (
                            <SelectItem
                                key={`${question.id}-inputKind-${option}`}
                                value={option}
                            >
                                {inputKindLabels[option]}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
        <Field className="gap-0">
            <FieldLegend>Автозаповнення</FieldLegend>
            <Select
                name={`${question.id}-userSource`}
                value={question.userSource ?? "NONE"}
                onValueChange={(val) => onChange({...question, userSource: val === "NONE" ? undefined : val})}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Оберіть відповідь..."/>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {userSources.map((option) => (
                            <SelectItem
                                key={`${question.id}-userSource-${option}`}
                                value={option}
                            >
                                {userSourcesLabels[option]}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </Field>
        <Field className="gap-0">
            <FieldLegend>Мінімальна довжина</FieldLegend>
            <Input
                type="number"
                placeholder="Необовʼязково"
                name={`${question.id}-minLength`}
                value={question.minLength ?? ""}
                min={0}
                onChange={e => {
                    const value = e.target.value.length > 0 ? +e.target.value : undefined;
                    onChange({...question, minLength: value});
                }}
            />
        </Field>
    </>
}