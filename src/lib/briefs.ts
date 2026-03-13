import type {Timestamp} from "firebase/firestore";
import type {User} from "@/lib/auth.ts";

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

export type BaseQuestion = {
    id: string;
    description: string;
    required?: boolean;
}

export type TextQuestion = {
    type: "text";
    inputKind: "text" | "email" | "address" | "phone" | "textarea";
    minLength?: number;
    userSource?: string;
}

export type CheckboxQuestion = {
    type: "checkbox";
    options: Option[];
}

export type RadioQuestion = {
    type: "radio";
    options: Option[];
}

export type SelectQuestion = {
    type: "select";
    options: Option[];
}

export type Question = BaseQuestion & (TextQuestion | CheckboxQuestion | RadioQuestion | SelectQuestion);

export type Block = {
    title: string;
    questions: Question[];
}

export type Brief = {
    id: string;
    title: string;
    description: string;
    schema: Block[];
    createdBy: string;
    createdAt: Timestamp;
}

export type Submission = {
    id: string;
    answers: Record<string, any>;
    brief: Brief;
    submitter?: User;
    createdAt: Timestamp;
}