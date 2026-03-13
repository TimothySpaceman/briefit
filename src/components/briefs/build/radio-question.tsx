import type {BaseQuestion, Question, RadioQuestion} from "@/lib/briefs.ts";
import OptionsBuilder from "@/components/briefs/build/options.tsx";

type Props = {
    question: BaseQuestion & RadioQuestion;
    onChange: (question: Question) => void;
}

export default function RadioQuestionBuilder({question, onChange}: Props) {
    return <OptionsBuilder
        options={question.options}
        onChange={newOptions => onChange({...question, options: newOptions})}
        minOptions={2}
    />
}