export type UserRole = "user" | "admin";
export type User = {
    displayName: string;
    email: string;
    role: UserRole;
}