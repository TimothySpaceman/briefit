import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import type {Submission} from "@/lib/briefs.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {doc, getDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import {BriefFormProvider, useBriefForm} from "@/components/briefs/brief-form-context.tsx";
import Block from "@/components/briefs/block.tsx";

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
                    <Form submission={submission}/>
                </BriefFormProvider>
            </>
        )}
    </div>
}

function Form({submission}: { submission: Submission }) {
    const navigate = useNavigate();
    const {isLoading, setIsLoading, answers} = useBriefForm();
    const {user} = useAuth();

    // async function handleSubmit() {
    //     setIsLoading(true);
    //     const data: any = {
    //         brief,
    //         answers,
    //         createdAt: serverTimestamp(),
    //     };
    //     if(user) data.submitter = user
    //
    //     try {
    //         await addDoc(collection(db, "submissions"), data);
    //         navigate("/submitted", {replace: true});
    //     } catch (error) {
    //         toast("Сталася помилка. Спробуйте пізніше")
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    return <form
        className="w-full max-w-xl flex flex-col items-center gap-6"
        onSubmit={e => e.preventDefault()}
    >
        {submission.brief.schema.map((block, i) => <Block block={block} key={`block-${i}`}/>)}
        {/*<Button*/}
        {/*    onClick={handleSubmit}*/}
        {/*    className="max-w-30 w-full text-base"*/}
        {/*    disabled={isLoading}*/}
        {/*>*/}
        {/*    {isLoading && <Spinner/>} Надіслати*/}
        {/*</Button>*/}
    </form>
}