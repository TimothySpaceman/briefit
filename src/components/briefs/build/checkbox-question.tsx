import type {BaseQuestion, CheckboxQuestion, Question} from "@/lib/briefs.ts";
import OptionsBuilder from "@/components/briefs/build/options.tsx";

type Props = {
    question: BaseQuestion & CheckboxQuestion;
    onChange: (question: Question) => void;
}

export default function CheckboxQuestionBuilder({question}: Props) {
    return <OptionsBuilder
        options={question.options}
        onChange={newOptions => onChange({...question, options: newOptions})}
        minOptions={1}
    />
}