import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import type {Brief} from "@/lib/briefs.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {addDoc, collection, doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "@/firebase";
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import Block from "@/components/briefs/view/block.tsx";
import {BriefFormProvider, useBriefForm} from "@/components/briefs/view/brief-form-context.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import { toast } from "sonner"
import BriefBuilder, {type BriefDraft} from "@/components/briefs/build/builder.tsx";

export default function EditBriefPage() {
    const {id} = useParams()
    const navigate = useNavigate();

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

    async function handleSave(draft: BriefDraft) {
        if(!brief) return;
        try {
            await setDoc(doc(db, "briefs", brief.id), {
                ...brief,
                ...draft
            })
            navigate(`/briefs/${brief.id}`);
        } catch (err) {
            toast("Сталася помилка. Спробуйте пізніше")
            console.error(err);
        }
    }

    return <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
        {isLoading && <Spinner className="size-12"/>}

        {!isLoading && brief && (
            <BriefBuilder initialBrief={brief} onSave={handleSave} />
        )}
    </div>
}