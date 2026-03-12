import {auth, db} from "./firebase";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    type User,
} from "firebase/auth";
import {doc, getDoc, serverTimestamp, setDoc} from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

async function ensureUserDoc(user: User) {
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
        await setDoc(userRef, {
            displayName: user.displayName ?? null,
            email: user.email ?? null,
            role: "user",
            createdAt: serverTimestamp(),
        });
    }
}

export async function loginWithGoogle(): Promise<User | null> {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const user = result.user;

        await ensureUserDoc(user);

        return user;
    } catch (err) {
        console.error("Google login failed:", err);
        return null;
    }
}

export async function registerWithEmail(
    email: string,
    password: string
): Promise<User | null> {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        await ensureUserDoc(user);

        return user;
    } catch (err) {
        console.error("Registration failed:", err);
        return null;
    }
}

export async function loginWithEmail(
    email: string,
    password: string
): Promise<User | null> {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        await ensureUserDoc(user);

        return user;
    } catch (err) {
        console.error("Email login failed:", err);
        return null;
    }
}

export async function logout(): Promise<void> {
    await signOut(auth);
}