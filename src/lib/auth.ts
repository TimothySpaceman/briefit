import type { Timestamp } from "firebase/firestore";

export type UserRole = "user" | "admin";

export type User = {
    displayName: string;
    email: string;
    role: UserRole;
    createdAt: Timestamp;
}