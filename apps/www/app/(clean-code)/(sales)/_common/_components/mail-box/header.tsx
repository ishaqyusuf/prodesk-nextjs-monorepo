import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMailbox } from "./context";
import { Label } from "@/components/ui/label";

export default function MailboxHeader({}) {
    const ctx = useMailbox();
    return (
        <div className="abolute top-0 p-2 sm:px-8 flex-col w-full border-b">
            <div className="flex gap-4">
                <Avatar>
                    <AvatarFallback>
                        {ctx.data.name
                            ?.split(" ")
                            ?.map((s) => s[0])
                            ?.filter(Boolean)
                            ?.filter((_, i) => i < 2)
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div className="">
                    <Label>{ctx.data?.name}</Label>
                    <div className="text-muted-foreground">
                        {ctx.data.email ||
                            ctx.data.fallbackEmail ||
                            "No email attached"}
                    </div>
                </div>
            </div>
        </div>
    );
}
