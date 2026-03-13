import {db} from "@/firebase";
import {collection, type DocumentData, getDocs, limit, orderBy, query, startAfter, where} from "firebase/firestore";
import {useEffect, useState} from "react";
import type {Submission} from "@/lib/briefs.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth.ts";
import SubmissionCard from "@/components/submission-card.tsx";

const PAGE_SIZE = 10;

export default function Submissions() {
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const {user} = useAuth();

    const fetchSubmissions = async (isFirstLoad = false) => {
        if(!user) return;
        setIsLoading(true);

        try {
            let q;

            if (isFirstLoad || !lastDoc) {
                q = query(
                    collection(db, "submissions"),
                    where("submitter.id", "==", user.id),
                    orderBy("createdAt", "desc"),
                    limit(PAGE_SIZE)
                );
            } else {
                q = query(
                    collection(db, "submissions"),
                    where("submitter.id", "==", user.id),
                    orderBy("createdAt", "desc"),
                    startAfter(lastDoc),
                    limit(PAGE_SIZE)
                );
            }

            const querySnapshot = await getDocs(q);

            const submissionsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Submission[];

            setSubmissions(prev => isFirstLoad ? submissionsList : [...prev, ...submissionsList]);

            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastDoc(lastVisible);

            if (querySnapshot.docs.length < PAGE_SIZE) {
                setHasMore(false);
            }

        } catch (error) {
            console.error("Error fetching submissions:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if(user) fetchSubmissions(true);
    }, [user]);

    return (
        <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
            <h1 className="text-center text-3xl font-bold">Ваші подання</h1>

            {submissions.map((submission) => (
                <SubmissionCard key={`submission-${submission.id}`} submission={submission} />
            ))}

            {isLoading && <Spinner className="size-12"/>}

            {!isLoading && hasMore && (
                <Button onClick={() => fetchSubmissions()}>
                    Завантажити ще
                </Button>
            )}
        </div>
    );
}