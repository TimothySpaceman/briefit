import {db} from "@/firebase";
import {
    collection,
    type DocumentData,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    startAfter,
    where
} from "firebase/firestore";
import {useEffect, useState} from "react";
import type {Submission} from "@/lib/briefs.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth.ts";
import SubmissionCard from "@/components/submission-card.tsx";
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList
} from "@/components/ui/combobox.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";

const PAGE_SIZE = 10;

type BriefOption = {
    id: string;
    title: string;
}

export default function Submissions() {
    const [brief, setBrief] = useState<BriefOption | null>();
    const [briefs, setBriefs] = useState<BriefOption[]>([]);
    const [briefsLoading, setBriefsLoading] = useState(true);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const {user} = useAuth();

    const fetchBriefOptions = async () => {
        setBriefsLoading(true);

        try {
            const q = query(
                collection(db, "briefs"),
                orderBy("createdAt", "desc")
            );

            const querySnapshot = await getDocs(q);

            const briefsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                title: doc.data().title
            }));

            setBriefs(briefsList as BriefOption[]);
        } catch (error) {
            console.error("Error fetching briefs:", error);
        } finally {
            setBriefsLoading(false);
        }
    };

    const fetchSubmissions = async (isFirstLoad = false) => {
        if (!user) return;
        setIsLoading(true);

        try {
            const constraints: QueryConstraint[] = [orderBy("createdAt", "desc"), limit(PAGE_SIZE)];

            if (user.role === "admin" && brief) {
                constraints.unshift(where("brief.id", "==", brief.id));
            }

            if (user.role !== "admin") {
                constraints.unshift(where("submitter.id", "==", user.id));
            }

            if (!isFirstLoad && lastDoc) {
                constraints.push(startAfter(lastDoc));
            }

            const querySnapshot = await getDocs(query(collection(db, "submissions"), ...constraints));

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
        if (user) fetchBriefOptions();
    }, [user]);

    useEffect(() => {
        if (user) fetchSubmissions(true);
    }, [user, brief]);

    return (
        <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
            <h1 className="text-center text-3xl font-bold">
                {user?.role === "admin" ? "Подання" : "Ваші подання"}
            </h1>

            {user?.role === "admin" && (
                briefsLoading ? <Spinner className="size-12"/> :
                    <Card className="w-full max-w-xl">
                        <CardContent className="flex gap-3 items-center">
                            <span>Фільтрувати: </span>
                            <Combobox items={briefs} itemToStringLabel={(item: BriefOption) => item.title}
                                      onValueChange={setBrief}>
                                <ComboboxInput className="grow-1" placeholder="Оберіть бриф..."/>
                                <ComboboxContent>
                                    <ComboboxEmpty>Нічого не знайдено...</ComboboxEmpty>
                                    <ComboboxList>
                                        {(item: BriefOption) => (
                                            <ComboboxItem key={`brief-${item.id}`} value={item}>
                                                {item.title}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </CardContent>
                    </Card>
            )}

            {submissions.map((submission) => (
                <SubmissionCard key={`submission-${submission.id}`} submission={submission}/>
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