import type {BaseQuestion, Question, SelectQuestion} from "@/lib/briefs.ts";
import OptionsBuilder from "@/components/briefs/build/options.tsx";

type Props = {
    question: BaseQuestion & SelectQuestion;
    onChange: (question: Question) => void;
}

export default function SelectQuestionBuilder({question, onChange}: Props) {
    return <OptionsBuilder
        options={question.options}
        onChange={newOptions => onChange({...question, options: newOptions})}
        minOptions={1}
    />
}