import {Card, CardContent} from "@/components/ui/card.tsx";
import {useState} from "react";
import type {Block, Brief} from "@/lib/briefs.ts";
import {Input} from "@/components/ui/input.tsx";
import {Field, FieldLegend} from "@/components/ui/field.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import BlockBuilder from "@/components/briefs/build/block.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Plus} from "lucide-react";

type BriefDraft = Omit<Brief, "id"|"createdBy"|"createdAt">

export default function BriefBuilder() {
    const [brief, setBrief] = useState<BriefDraft>({
        title: "Новий бриф",
        description: "",
        schema: []
    });

    function updateBrief<K extends keyof BriefDraft>(field: K, value: BriefDraft[K]) {
        setBrief(prev => ({...prev, [field]: value}));
    }

    function handleUpdateBlock(index: number, newBlock: Block){
        updateBrief("schema", brief.schema.toSpliced(index, 1, newBlock))
    }

    function handleAddBlock(){
        updateBrief("schema", [...brief.schema, {
            title: "Новий блок",
            questions: []
        }])
    }

    function handleRemoveBlock(index: number){
        updateBrief("schema", brief.schema.toSpliced(index, 1))
    }

    return <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
        <Card className="w-full max-w-xl">
            <CardContent className="flex flex-col gap-2">
                <Field className="gap-0">
                    <FieldLegend>Назва</FieldLegend>
                    <Input
                        name="title"
                        value={brief.title}
                        onChange={e => updateBrief("title", e.currentTarget.value)}
                    />
                </Field>
                <Field className="gap-0">
                    <FieldLegend>Опис</FieldLegend>
                    <Textarea
                        name="description"
                        value={brief.description}
                        onChange={e => updateBrief("description", e.currentTarget.value)}
                    />
                </Field>
            </CardContent>
        </Card>
        {brief.schema.map((block, i) => <BlockBuilder
            key={`block-${i}`}
            block={block}
            onChange={newBlock => handleUpdateBlock(i, newBlock)}
            onRemove={() => handleRemoveBlock(i)}
        />)}
        <Button onClick={handleAddBlock}>
            <Plus/> Додати блок
        </Button>
        <pre>
            {JSON.stringify(brief.schema, null, 2)}
        </pre>
    </div>
}