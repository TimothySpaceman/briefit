import type {Question} from "@/lib/briefs.ts";
import TextQuestion from "@/components/briefs/view/text-question.tsx";
import CheckboxQuestion from "@/components/briefs/view/checkbox-question.tsx";
import RadioQuestion from "./radio-question.tsx";
import SelectQuestion from "@/components/briefs/view/select-question.tsx";

type Props = {
    question: Question;
}

export default function Question({question}: Props) {
    return <div className="flex flex-col gap-1">
        <p className="text-base">{question.description}</p>
        <QuestionControls question={question}/>
    </div>
}

function QuestionControls({question}: Props) {
    switch (question.type) {
        case "text":
            return <TextQuestion question={question}/>;
        case "checkbox":
            return <CheckboxQuestion question={question}/>;
        case "radio":
            return <RadioQuestion question={question}/>;
        case "select":
            return <SelectQuestion question={question}/>;
        default:
            return <></>;
    }
}