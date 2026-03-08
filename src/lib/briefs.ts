import type {Timestamp} from "firebase/firestore";

export const QuestionTypes = {
    text: "text",
    checkbox: "checkbox",
    radio: "radio",
    select: "select",
} as const
export type QuestionType = keyof typeof QuestionTypes;

export type Option = {
    label: string;
    value: string;
}

export type TextQuestion = {
    id: string;
    type: "text";
    description: string;
    inputKind: "text" | "email" | "address" | "phone";
    minLength?: number;
}

export type CheckboxQuestion = {
    id: string;
    type: "checkbox";
    description: string;
    options: Option[];
}

export type RadioQuestion = {
    id: string;
    type: "radio";
    description: string;
    options: Option[];
}

export type SelectQuestion = {
    id: string;
    type: "select";
    description: string;
    options: Option[];
}

export type Question = TextQuestion | CheckboxQuestion | RadioQuestion | SelectQuestion;

export type Block = {
    title: string;
    questions: Question[];
}

export type Brief = {
    id: string;
    title: string;
    description: string;
    schema: string;
    createdBy: string;
    createdAt: Timestamp;
}