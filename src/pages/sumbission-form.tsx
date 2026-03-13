import {useEffect, useState} from "react";
import {useBeforeUnload, useLocation, useNavigate, useParams} from "react-router-dom";
import type {Submission} from "@/lib/briefs.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {collection, doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import {BriefFormProvider, useBriefForm} from "@/components/briefs/brief-form-context.tsx";
import Block from "@/components/briefs/block.tsx";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

export default function SubmissionForm() {
    const {id} = useParams()
    const {user} = useAuth();
    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [submission, setSubmission] = useState<Submission>()

    useEffect(() => {
        if (!id) return;

        const fetchBrief = async () => {
            setIsLoading(true);
            try {
                const snap = await getDoc(doc(db, "submissions", id));
                if (snap.exists()) {
                    setSubmission({...snap.data(), id: snap.id} as Submission);
                }
            } catch (error) {
                console.error(error);
                navigate("/submissions")
            }
            setIsLoading(false);
        }

        fetchBrief();
    }, [id])

    const isOwn = user && user.id === submission?.submitter?.id
    const submitter = isOwn ? "вас" : submission?.submitter?.displayName ?? "анонімного користувача"

    return <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
        {isLoading && <Spinner className="size-12"/>}

        {!isLoading && submission && (
            <>
                <Card className="w-full max-w-xl">
                    <CardTitle className="px-4">
                        <h2 className="text-2xl font-bold">{submission.brief.title}</h2>
                    </CardTitle>
                    <CardContent>
                        <p className="text-base">{submission.brief.description}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start text-base">
                        <p>Від {submitter}</p>
                        <p className="text-muted-foreground">{submission.createdAt.toDate().toLocaleString()}</p>
                    </CardFooter>
                </Card>
                <BriefFormProvider defaultAnswers={submission.answers} isReadOnly={!user || user.role !== "admin"}>
                    <Form submission={submission} defaultAnswers={submission.answers}/>
                </BriefFormProvider>
            </>
        )}
    </div>
}

function Form({submission, defaultAnswers}: { submission: Submission, defaultAnswers: Record<string, any> }) {
    const [originalAnswers, setOriginalAnswers] = useState<Record<string, any>>(defaultAnswers)
    const {isLoading, isReadOnly, setIsLoading, answers, setAnswers} = useBriefForm();

    const isDirty = JSON.stringify(answers) !== JSON.stringify(originalAnswers);

    async function handleSubmit() {
        if(isReadOnly) return;
        setIsLoading(true);
        const data: any = {
            ...submission,
            answers
        };

        try {
            await setDoc(doc(db, "submissions", submission.id), data);
            setOriginalAnswers({...answers})
        } catch (error) {
            toast("Сталася помилка. Спробуйте пізніше")
        } finally {
            setIsLoading(false);
        }
    }

    useBeforeUnload(
        (e) => {
            if (isDirty) {
                e.preventDefault();
            }
        },
        { capture: true }
    );

    return <>
        {isDirty && <Card className="w-full max-w-xl">
            <CardContent className="flex gap-1 items-center justify-end">
                <div className="text-destructive font-bold text-base ml-0 mr-auto">Наявні незбережені зміни</div>
                <Button
                    onClick={() => setAnswers({...originalAnswers})}
                    variant="outline"
                    disabled={isLoading}
                >
                    Скинути
                </Button
                >
                <Button onClick={handleSubmit} disabled={isLoading}>
                    Зберегти
                </Button>
            </CardContent>
        </Card>}
        <form
            className="w-full max-w-xl flex flex-col items-center gap-6"
            onSubmit={e => e.preventDefault()}
        >
            {submission.brief.schema.map((block, i) => <Block block={block} key={`block-${i}`}/>)}
        </form>
    </>
}