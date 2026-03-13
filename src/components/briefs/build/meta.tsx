import {Card, CardContent} from "@/components/ui/card.tsx";
import {Field, FieldError, FieldLegend} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {type ReactNode} from "react";

type BriefMeta = {
    title: string;
    description: string;
}

type Props = {
    brief: BriefMeta,
    onChange: (newBrief: BriefMeta) => void,
    actions?: ReactNode
    errors: Record<string, string>
}

export default function MetaBuilder({brief, onChange, actions, errors}: Props) {
    return <Card className="w-full max-w-xl">
        <CardContent className="flex flex-col gap-2">
            <Field className="gap-0">
                <div className="flex gap-2 items-center justify-end mb-1">
                    <FieldLegend className="ml-0 mr-auto">Назва</FieldLegend>
                    {actions}
                </div>
                <Input
                    name="title"
                    value={brief.title}
                    onChange={e => onChange({...brief, title: e.currentTarget.value})}
                />
                <FieldError>
                    {errors.title}
                </FieldError>
            </Field>
            <Field className="gap-0">
                <FieldLegend>Опис</FieldLegend>
                <Textarea
                    name="description"
                    value={brief.description}
                    onChange={e => onChange({...brief, description: e.currentTarget.value})}
                />
                <FieldError>
                    {errors.description}
                </FieldError>
            </Field>
        </CardContent>
    </Card>
}