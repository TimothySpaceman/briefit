import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-xl flex-col gap-6">
                <Card>
                    <CardTitle>
                        <h1 className="text-3xl font-bold text-center px-2">Вітаємо на Briefy!</h1>
                    </CardTitle>
                    <CardContent>
                        <p className="text-xl text-center">
                            Це - платформа для заповнення брифів.
                            Якщо Вам не надали посилання на конкретний бриф, ви можете переглянути доступні брифи
                            на <Link className="underline" to="/briefs">цій сторінці</Link>.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}