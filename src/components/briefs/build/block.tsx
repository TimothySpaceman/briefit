import type {
    BaseQuestion,
    Block,
    CheckboxQuestion,
    Question,
    QuestionType,
    RadioQuestion,
    SelectQuestion,
    TextQuestion
} from "@/lib/briefs.ts";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Field, FieldError, FieldLegend} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Plus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import QuestionBuilder from "@/components/briefs/build/question.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {extractByPrefix} from "@/lib/utils.ts";

type Props = {
    block: Block
    onChange: (newBlock: Block) => void
    onRemove: () => void
    errors: Record<string, string>
    isLoading?: boolean
}

type Templates = {
    text: () => BaseQuestion & TextQuestion
    radio: () => BaseQuestion & RadioQuestion
    checkbox: () => BaseQuestion & CheckboxQuestion
    select: () => BaseQuestion & SelectQuestion
}

const templates: Templates = {
    text: () => ({
        id: crypto.randomUUID(),
        description: "Нове питання",
        type: "text",
        required: true,
        inputKind: "text",
    }),
    radio: () => ({
        id: crypto.randomUUID(),
        description: "Нове питання",
        type: "radio",
        required: true,
        options: [
            {
                value: crypto.randomUUID(),
                label: "Варіант 1"
            },
            {
                value: crypto.randomUUID(),
                label: "Варіант 2"
            }
        ]
    }),
    checkbox: () => ({
        id: crypto.randomUUID(),
        description: "Нове питання",
        type: "checkbox",
        required: true,
        options: [
            {
                value: crypto.randomUUID(),
                label: "Варіант 1"
            }
        ]
    }),
    select: () => ({
        id: crypto.randomUUID(),
        description: "Нове питання",
        type: "select",
        required: true,
        options: [
            {
                value: crypto.randomUUID(),
                label: "Варіант 1"
            }
        ]
    })
}

export default function BlockBuilder({block, onChange, onRemove, isLoading, errors}: Props) {
    function handleRemove() {
        if(confirm(`Ви дійсно хочете видалити блок "${block.title}"?`)){
            onRemove()
        }
    }

    function handleUpdateQuestion(index: number, newQuestion: Question){
        onChange({
            ...block,
            questions: block.questions.toSpliced(index, 1, newQuestion)
        })
    }

    function handleRemoveQuestion(index: number){
        onChange({
            ...block,
            questions: block.questions.toSpliced(index, 1)
        })
    }

    function handleAddQuestion(questionType: QuestionType){
        const factory = templates[questionType];
        onChange({
            ...block,
            questions: [...block.questions, factory()]
        })
    }

    return <Card className="w-full max-w-xl transition-shadow relative">
        <CardTitle className="px-4">
            <Field className="gap-0">
                <div className="flex items-end justify-between gap-2">
                    <FieldLegend>Назва блоку</FieldLegend>
                    <Button className="mb-1" variant="destructive" size="icon-sm" onClick={handleRemove}>
                        <Trash/>
                    </Button>
                </div>
                <Input
                    name="title"
                    value={block.title}
                    onChange={e => onChange({...block, title: e.target.value})}
                />
                <FieldError>
                    {errors.title}
                </FieldError>
            </Field>
        </CardTitle>
        <CardContent className="flex flex-col gap-8">
            {block.questions.map((question, i) => <div
                key={`q-${question.id}`}
                className="flex flex-col gap-3"
            >
                <Separator/>
                <QuestionBuilder
                    question={question}
                    onChange={newQuestion => handleUpdateQuestion(i, newQuestion)}
                    onRemove={() => handleRemoveQuestion(i)}
                    errors={extractByPrefix(errors, `questions_${i}_`)}
                />
            </div>)}
            <Separator/>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="w-max mx-auto">
                        <Plus/> Додати питання
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={()=>handleAddQuestion("text")}>
                        Текст
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>handleAddQuestion("radio")}>
                        Один варіант
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>handleAddQuestion("checkbox")}>
                        Декілька варіантів
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={()=>handleAddQuestion("select")}>
                        Вибір зі списку
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </CardContent>
        {isLoading && <div className="absolute inset-0 bg-background/75 flex items-center justify-center">
            <Spinner className="size-12"/>
        </div>}
    </Card>
}