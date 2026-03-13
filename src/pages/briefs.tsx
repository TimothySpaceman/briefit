import {db} from "@/firebase";
import {
    collection,
    doc,
    type DocumentData,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query, setDoc,
    startAfter
} from "firebase/firestore";
import {useEffect, useState} from "react";
import type {Brief} from "@/lib/briefs.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import BriefCard from "@/components/brief-card.tsx";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/useAuth.ts";
import {Link} from "react-router-dom";

const PAGE_SIZE = 10;

export default function Briefs() {
    const [briefs, setBriefs] = useState<Brief[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [lastDoc, setLastDoc] = useState<DocumentData | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const {user} = useAuth();

    const fetchBriefs = async (isFirstLoad = false) => {
        setIsLoading(true);

        try {
            let q;

            if (isFirstLoad || !lastDoc) {
                q = query(
                    collection(db, "briefs"),
                    orderBy("createdAt", "desc"),
                    limit(PAGE_SIZE)
                );
            } else {
                q = query(
                    collection(db, "briefs"),
                    orderBy("createdAt", "desc"),
                    startAfter(lastDoc),
                    limit(PAGE_SIZE)
                );
            }

            const querySnapshot = await getDocs(q);

            const briefsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Brief[];

            setBriefs(prev => isFirstLoad ? briefsList : [...prev, ...briefsList]);

            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            setLastDoc(lastVisible);

            if (querySnapshot.docs.length < PAGE_SIZE) {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching briefs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBriefs(true);
    }, []);

    return (
        <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
            <div className="w-full max-w-xl flex items-center justify-between gap-2">
                <h1 className="text-center text-3xl font-bold">Брифи</h1>
                {user?.role === "admin" && <Button asChild>
                    <Link to={`/briefs/new`}>Створити</Link>
                </Button>}
            </div>

            {briefs.map((brief) => (
                <BriefCard
                    key={`brief-${brief.id}`}
                    brief={brief}
                    actions={user?.role === "admin" ? (
                        <p>Admin here</p>
                        ) : (
                        <Button asChild>
                            <Link to={`/briefs/${brief.id}`}>Заповнити</Link>
                        </Button>
                    )}
                />
            ))}

            {isLoading && <Spinner className="size-12"/>}

            {!isLoading && hasMore && (
                <Button onClick={() => fetchBriefs()}>
                    Завантажити ще
                </Button>
            )}
        </div>
    );
}