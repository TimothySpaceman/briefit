import type {BaseQuestion, Question, SelectQuestion} from "@/lib/briefs.ts";
import OptionsBuilder from "@/components/briefs/build/options.tsx";
import {extractByPrefix} from "@/lib/utils.ts";

type Props = {
    question: BaseQuestion & SelectQuestion;
    onChange: (question: Question) => void;
    errors: Record<string, string>
}

export default function SelectQuestionBuilder({question, onChange, errors}: Props) {
    const optionsErrors = {
        ...extractByPrefix(errors, "options_"),
        general: errors["options"]
    }

    return <OptionsBuilder
        errors={optionsErrors}
        options={question.options}
        onChange={newOptions => onChange({...question, options: newOptions})}
        minOptions={1}
    />
}