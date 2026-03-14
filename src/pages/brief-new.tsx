import BriefBuilder, {type BriefDraft} from "@/components/briefs/build/builder.tsx";
import {useAuth} from "@/hooks/useAuth.ts";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import {db} from "@/firebase.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "sonner";

const template = {
    title: "Новий бриф",
    description: "",
    schema: []
}

export default function NewBrief() {
    const {user} = useAuth();
    const navigate = useNavigate();

    async function handleSave(draft: BriefDraft): Promise<void> {
        if(!user) return;

        try {
            const snap = await addDoc(collection(db, "briefs"), {
                ...draft,
                createdBy: `users/${user.id}`,
                createdAt: serverTimestamp()
            })
            navigate(`/briefs/${snap.id}`);
        } catch (err) {
            toast("Сталася помилка. Спробуйте пізніше")
            console.error(err);
        }
    }

    return <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
        <BriefBuilder initialBrief={template} onSave={handleSave}/>
    </div>
}