import {createContext, type PropsWithChildren, useContext, useState} from "react";

type BriefFormContextType = {
    isReadOnly: boolean,
    isLoading: boolean,
    autofill: boolean,
    setIsLoading: (value: boolean) => void,
    answers: Record<string, any>;
    setAnswers: (answers: Record<string, any>) => void;
    setAnswer: (id: string, value: any) => void;
};

export const BriefFormContext = createContext<BriefFormContextType | null>(null);

type Props = PropsWithChildren & {
    autofill?: boolean;
    isReadOnly?: boolean;
    defaultAnswers?: Record<string, any>;
};

export function BriefFormProvider({children, defaultAnswers = {}, isReadOnly = false, autofill = false}: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [answers, setAnswers] = useState<Record<string, any>>(defaultAnswers);

    const setAnswer = (id: string, value: any) => {
        setAnswers(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <BriefFormContext.Provider value={{isReadOnly, isLoading, autofill, setIsLoading, answers, setAnswers, setAnswer}}>
            {children}
        </BriefFormContext.Provider>
    );
}

export function useBriefForm() {
    const ctx = useContext(BriefFormContext);
    if (!ctx) throw new Error("useBriefForm must be inside BriefFormProvider");
    return ctx;
}