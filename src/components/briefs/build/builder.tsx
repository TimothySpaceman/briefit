import {type Block, type Brief, briefSchema} from "@/lib/briefs.ts";
import {useEffect, useState} from "react";
import MetaBuilder from "@/components/briefs/build/meta.tsx";
import {Button} from "@/components/ui/button.tsx";
import BlockBuilder from "@/components/briefs/build/block.tsx";
import {extractByPrefix} from "@/lib/utils.ts";
import {Plus} from "lucide-react";
import {Spinner} from "@/components/ui/spinner.tsx";

export type BriefDraft = Omit<Brief, "id"|"createdBy"|"createdAt">

type Props = {
    initialBrief: BriefDraft
    onSave: (brief: BriefDraft) => Promise<void>
}

export default function BriefBuilder({initialBrief, onSave}: Props) {
    const [brief, setBrief] = useState<BriefDraft>(initialBrief);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function validate(){
        const result = briefSchema.safeParse(brief);
        if(result.success){
            setErrors({})
        } else {
            setErrors(Object.fromEntries(result.error.issues.map(issue => [
                issue.path.join("_"),
                issue.message
            ])))
        }
    }

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

    async function handleSave(){
        if(Object.keys(errors).length > 0) return;
        setIsLoading(true);
        await onSave(brief);
        setIsLoading(false);
    }

    useEffect(() => {
        validate()
    }, [brief])

    return <>
        <MetaBuilder
            brief={brief}
            onChange={newMeta => setBrief({...brief, ...newMeta})}
            actions={<Button
                onClick={handleSave}
                disabled={isLoading || Object.keys(errors).length > 0}
            >
                {isLoading && <Spinner/>} Зберегти
            </Button>}
            errors={errors}
        />
        {brief.schema.map((block, i) => <BlockBuilder
            key={`block-${i}`}
            block={block}
            onChange={newBlock => handleUpdateBlock(i, newBlock)}
            onRemove={() => handleRemoveBlock(i)}
            errors={extractByPrefix(errors, `schema_${i}_`)}
            isLoading={isLoading}
        />)}
        <Button onClick={handleAddBlock} disabled={isLoading}>
            <Plus/> Додати блок
        </Button>
    </>
}