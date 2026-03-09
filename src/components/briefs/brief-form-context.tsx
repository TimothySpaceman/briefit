import {createContext, type PropsWithChildren, useContext, useState} from "react";

type BriefFormContextType = {
    isLoading: boolean,
    setIsLoading: (value: boolean) => void,
    answers: Record<string, any>;
    setAnswer: (id: string, value: any) => void;
};

export const BriefFormContext = createContext<BriefFormContextType | null>(null);

export function BriefFormProvider({children}: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [answers, setAnswers] = useState<Record<string, any>>({});

    const setAnswer = (id: string, value: any) => {
        setAnswers(prev => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <BriefFormContext.Provider value={{isLoading, setIsLoading, answers, setAnswer}}>
            {children}
        </BriefFormContext.Provider>
    );
}

export function useBriefForm() {
    const ctx = useContext(BriefFormContext);
    if (!ctx) throw new Error("useBriefForm must be inside BriefFormProvider");
    return ctx;
}