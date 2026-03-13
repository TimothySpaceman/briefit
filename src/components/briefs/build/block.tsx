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
import {Field, FieldLegend} from "@/components/ui/field.tsx";
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

type Props = {
    block: Block
    onChange: (newBlock: Block) => void
    onRemove: () => void
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

export default function BlockBuilder({block, onChange, onRemove}: Props) {
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

    return <Card className="w-full max-w-xl transition-shadow">
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
            </Field>
        </CardTitle>
        <CardContent className="flex flex-col gap-8">
            {block.questions.map((question, i) => <div className="flex flex-col gap-3">
                <Separator/>
                <QuestionBuilder
                    key={`q-${question.id}`}
                    question={question}
                    onChange={newQuestion => handleUpdateQuestion(i, newQuestion)}
                    onRemove={() => handleRemoveQuestion(i)}
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
    </Card>
}