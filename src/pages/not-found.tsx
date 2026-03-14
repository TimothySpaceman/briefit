import {Card, CardContent, CardHeader} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

export default function NotFound() {
    return <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-xl flex-col gap-6">
            <Card>
                <CardHeader>
                    <h1 className="font-bold text-center text-3xl">Сторінку не знайдено :(</h1>
                </CardHeader>
                <CardContent className="text-base flex flex-col items-center gap-4">
                    <p>Шо поробиш 🤷‍♂️</p>
                    <Button asChild>
                        <Link to="/" className="max-w-xs">На головну</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    </div>
}