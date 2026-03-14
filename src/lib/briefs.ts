import type {Timestamp} from "firebase/firestore";
import type {User} from "@/lib/auth.ts";
import {z} from "zod";

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
    minLength?: number|null;
    userSource?: string|null;
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

export const baseQuestionSchema = z.object({
    id: z.string().min(1, "ID питання обовʼязковий"),
    description: z.string().min(1, "Текст питання обовʼязковий (довше 1 символа)"),
    type: z.enum(["text", "radio", "checkbox", "select"]),
    required: z.boolean().optional(),
})

export const textQuestionSchema = baseQuestionSchema.extend({
    type: z.literal("text"),
    inputKind: z.enum(["text", "textarea", "email", "address", "phone"], "Некоректний вид поля"),
    minLength: z.int().min(0, "Мінімальна довжина не може бути менше 0").nullable().optional(),
    userSource: z.enum(["email", "displayName"], "Некоректне поле автозаповнення").nullable().optional()
})

export const optionSchema = z.object({
    value: z.string().min(1, "Значення (ідентифікатор) варіанту обовʼязковий"),
    label: z.string().min(1, "Заголовок варіанту обовʼязковий (довше 1 символа)")
})

export const radioQuestionSchema = baseQuestionSchema.extend({
    type: z.literal("radio"),
    options: z.array(optionSchema).min(2, "Питання цього типу повинні мати щонайменше 2 варіанти")
})

export const checkboxQuestionSchema = baseQuestionSchema.extend({
    type: z.literal("checkbox"),
    options: z.array(optionSchema).min(1, "Питання цього типу повинні мати щонайменше 1 варіант")
})

export const selectQuestionSchema = baseQuestionSchema.extend({
    type: z.literal("select"),
    options: z.array(optionSchema).min(1, "Питання цього типу повинні мати щонайменше 1 варіант")
})

export const questionSchema = z.discriminatedUnion(
    "type",
    [textQuestionSchema, radioQuestionSchema, checkboxQuestionSchema, selectQuestionSchema]
)

export const blockSchema = z.object({
    title: z.string().min(1, "Назва блоку обовʼязкова (довше 1 символа)"),
    questions: z.array(questionSchema),
})

export const briefMetaSchema = z.object({
    title: z.string().min(1, "Назва брифу обовʼязкова (довше 1 символа)"),
    description: z.string().optional()
})

export const briefSchema = briefMetaSchema.extend({
    schema: z.array(blockSchema)
})