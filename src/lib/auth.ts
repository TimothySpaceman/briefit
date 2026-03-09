import type {Timestamp} from "firebase/firestore";

export type UserRole = "user" | "admin";

export type User = {
    id: string;
    displayName: string;
    email: string;
    role: UserRole;
    createdAt: Timestamp;
}