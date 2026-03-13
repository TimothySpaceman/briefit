import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import type {Brief} from "@/lib/briefs.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {addDoc, collection, doc, getDoc, serverTimestamp} from "firebase/firestore";
import {db} from "@/firebase";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import Block from "@/components/briefs/block";
import {BriefFormProvider, useBriefForm} from "@/components/briefs/brief-form-context";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import { toast } from "sonner"

export default function BriefForm() {
    const {id} = useParams()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [brief, setBrief] = useState<Brief>()

    useEffect(() => {
        if (!id) return;

        const fetchBrief = async () => {
            setIsLoading(true);
            const snap = await getDoc(doc(db, "briefs", id));
            if (snap.exists()) {
                setBrief({...snap.data(), id: snap.id} as Brief);
            }
            setIsLoading(false);
        }

        fetchBrief();
    }, [id])

    return <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
        {isLoading && <Spinner className="size-12"/>}

        {!isLoading && brief && (
            <>
                <Card className="w-full max-w-xl">
                    <CardTitle className="px-4">
                        <h2 className="text-2xl font-bold">{brief.title}</h2>
                    </CardTitle>
                    <CardContent>
                        <p className="text-base">{brief.description}</p>
                    </CardContent>
                </Card>
                <BriefFormProvider>
                    <Form brief={brief}/>
                </BriefFormProvider>
            </>
        )}
    </div>
}

function Form({brief}: { brief: Brief }) {
    const navigate = useNavigate();
    const {isLoading, setIsLoading, answers} = useBriefForm();
    const {user} = useAuth();

    async function handleSubmit() {
        setIsLoading(true);
        const data: any = {
            brief,
            answers,
            createdAt: serverTimestamp(),
        };
        if(user) data.submitter = user

        try {
            await addDoc(collection(db, "submissions"), data);
            navigate("/submitted", {replace: true});
        } catch (error) {
            toast("Сталася помилка. Спробуйте пізніше")
        } finally {
            setIsLoading(false);
        }
    }

    return <form
        className="w-full max-w-xl flex flex-col items-center gap-6"
        onSubmit={e => e.preventDefault()}
    >
        {brief.schema.map((block, i) => <Block block={block} key={`block-${i}`}/>)}
        <Button
            onClick={handleSubmit}
            className="max-w-30 w-full text-base"
            disabled={isLoading}
        >
            {isLoading && <Spinner/>} Надіслати
        </Button>
    </form>
}