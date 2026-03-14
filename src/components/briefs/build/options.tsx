import type {Option} from "@/lib/briefs.ts";
import {Field, FieldError, FieldLegend} from "@/components/ui/field.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Plus, Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

type Props = {
    errors: Record<string, string>,
    options: Option[]
    onChange: (newOptions: Option[]) => void;
    minOptions?: number;
}

export default function OptionsBuilder({options, onChange, minOptions = 1, errors}: Props) {

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
        <FieldError>
            {errors["general"]}
        </FieldError>
        {options.map((option, i) => <div className="flex flex-col" key={`option-${option.value}`}>
            <div className="flex gap-1">
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
            </div>
            <FieldError>
                {errors[`${i}_label`]}
            </FieldError>
        </div>)}
        <Button onClick={handleAdd} className="w-max! mx-auto grow-0">
            <Plus/> Додати варіант
        </Button>
    </Field>
}