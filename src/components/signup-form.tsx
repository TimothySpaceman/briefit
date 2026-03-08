import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card"
import {Field, FieldDescription, FieldGroup, FieldLabel,} from "@/components/ui/field"
import {Input} from "@/components/ui/input"
import {Link, useNavigate} from "react-router-dom"

import {type SubmitEvent, useState} from "react"
import {auth, db} from "@/firebase"

import {createUserWithEmailAndPassword, updateProfile,} from "firebase/auth"

import {doc, setDoc} from "firebase/firestore"
import {Spinner} from "@/components/ui/spinner.tsx";
import {getFirebaseErrorMessage} from "@/lib/firebase-errors.ts";

export function SignupForm({
                               className,
                               ...props
                           }: React.ComponentProps<"div">) {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)

        if (password.length < 8) {
            setError("Пароль має містити щонайменше 8 символів")
            return
        }

        if (password !== confirmPassword) {
            setError("Паролі не співпадають")
            return
        }

        try {
            setLoading(true)

            const cred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            const user = cred.user

            await updateProfile(user, {
                displayName: name,
            })

            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                displayName: name,
                role: "user",
                createdAt: new Date(),
            })

            navigate("/")
        } catch (err: any) {
            setError(getFirebaseErrorMessage(err.code))
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Реєстрація</CardTitle>
                    <CardDescription>
                        Заповніть форму нижче, щоб створити обліковий запис
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <FieldGroup>

                            <Field>
                                <FieldLabel htmlFor="name">Ім'я</FieldLabel>
                                <Input
                                    id="name"
                                    placeholder="Андрій Морозов"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="for@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Field>

                            <Field>
                                <div className="grid grid-cols-2 gap-4">

                                    <Field>
                                        <FieldLabel htmlFor="password">Пароль</FieldLabel>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Field>

                                    <Field>
                                        <FieldLabel htmlFor="confirm-password">
                                            Підтвердіть пароль
                                        </FieldLabel>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                            required
                                        />
                                    </Field>

                                </div>

                                <FieldDescription>
                                    Щонайменше 8 символів
                                </FieldDescription>
                            </Field>

                            {error && (
                                <p className="text-sm text-destructive">{error}</p>
                            )}

                            <Field>
                                <Button type="submit" disabled={loading}>
                                    {loading && <Spinner/>} Зареєструватися
                                </Button>

                                <FieldDescription className="text-center">
                                    Вже зареєстровані? <Link to="/login">Увійти</Link>
                                </FieldDescription>
                            </Field>

                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}