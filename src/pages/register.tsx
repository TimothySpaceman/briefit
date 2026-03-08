import {SignupForm} from "@/components/signup-form.tsx";

export default function Register() {
    return (
        <div className="grow-1 flex flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <SignupForm/>
            </div>
        </div>
    )
}