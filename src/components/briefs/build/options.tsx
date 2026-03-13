import type {Option} from "@/lib/briefs.ts";
import {Field, FieldLegend} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Plus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    options: Option[]
    onChange: (newOptions: Option[]) => void;
    minOptions?: number;
}

export default function OptionsBuilder({options, onChange, minOptions = 1}: Props) {

    function handleAdd(){
        onChange([...options, {
            value: crypto.randomUUID(),
            label: `Варіант ${options.length + 1}`,
        }])
    }

    function handleChange(index: number, newOption: Option) {
        onChange(options.toSpliced(index, 1, newOption))
    }

    function handleRemove(index: number){
        onChange(options.toSpliced(index, 1))
    }

    return <Field className="gap-1">
        <FieldLegend>Варіанти відповіді</FieldLegend>
        {options.map((option, i) => <div className="flex gap-1">
            <Input
                name={`option-${option.value}-label`}
                value={option.label}
                onChange={e => handleChange(i, {...option, label: e.target.value})}
            />
            <Button
                className="mb-1"
                variant="destructive"
                size="icon"
                onClick={() => handleRemove(i)}
                disabled={options.length <= minOptions}
            >
                <Trash/>
            </Button>
        </div>)}
        <Button onClick={handleAdd} className="w-max! mx-auto grow-0">
            <Plus/> Додати варіант
        </Button>
    </Field>
}