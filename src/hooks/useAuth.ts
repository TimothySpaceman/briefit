import {useEffect, useState} from "react";
import {auth, db} from "../firebase";
import {onAuthStateChanged, type User as FirebaseUser} from "firebase/auth";
import type {User} from "../lib/auth";
import {doc, getDoc} from "firebase/firestore";

export type AuthWithRole =
    | {
    fbUser: FirebaseUser;
    user: User;
    loading: boolean;
}
    | {
    fbUser: null;
    user: null;
    loading: boolean;
};

async function waitForUserDoc(uid: string, retries = 5, delay = 200): Promise<User> {
    const ref = doc(db, "users", uid);
    for (let i = 0; i < retries; i++) {
        const snap = await getDoc(ref);
        if (snap.exists()) {
            return snap.data() as User;
        }
        await new Promise((res) => setTimeout(res, delay));
    }
    throw new Error("User document does not exist after retries");
}

export function useAuth(): AuthWithRole {
    const [state, setState] = useState<AuthWithRole>({
        fbUser: null,
        user: null,
        loading: true,
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
            if (!fbUser) {
                setState({fbUser: null, user: null, loading: false});
                return;
            }

            try {
                const userDoc = await waitForUserDoc(fbUser.uid);
                setState({fbUser, user: userDoc, loading: false});
            } catch (err) {
                console.error("Failed to fetch user role:", err);
                setState({fbUser: null, user: null, loading: false});
            }
        });

        return unsubscribe;
    }, []);

    return state;
}