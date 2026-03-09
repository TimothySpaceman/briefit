import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {MailCheck} from "lucide-react";

export default function Submitted() {
    return (
        <div className="grow-1 flex flex-col items-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-xl flex-col gap-6">
                <Card>
                    <CardTitle className="flex flex-col items-center gap-2">
                        <MailCheck size="48"/>
                        <h1 className="text-3xl font-bold text-center px-2">
                            Вашу відповідь записано!
                        </h1>
                    </CardTitle>
                    <CardContent className="flex flex-col items-center gap-4">
                        <p className="text-xl text-center">
                            Наші представники зв'яжуться з вами найближчим часом за контактами, наданими в брифі.
                        </p>
                        <Button asChild>
                            <Link to="/" className="max-w-xs">На головну</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}