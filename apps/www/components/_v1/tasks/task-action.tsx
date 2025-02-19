"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { openModal } from "@/lib/modal";
import { usePathname } from "next/navigation";

export default function TaskAction({}) {
    const { data: session } = useSession({
        required: false,
    });
    const can = session?.can;
    const path = usePathname();
    const [actions, setTabs] = useState(
        [
            can?.viewTech && "punchout",
            can?.viewInstallation && "installation",
            can?.viewDecoShutterInstall && "Deco-Shutter",
        ].filter(Boolean)
    );
    function open(_type) {
        let type = _type?.toLowerCase();
        let defaultTab = path?.includes("/contractor") ? "user" : "tasks";
        // if (type == "punchout") defaultTab = "tasks";
        openModal("submitJob", {
            data: { type },
            defaultTab,
        });
    }
    if (actions.length == 1)
        return (
            <Button
                onClick={() => {
                    open(actions?.[0]);
                }}
                size="sm"
                className="h-8"
            >
                <Plus className="h-4 w-4 mr-2" />
                <span>Task</span>
            </Button>
        );
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" className="h-8">
                        <Plus className="h-4 w-4 mr-2" />
                        <span>Task</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    {actions.map((a) => (
                        <DropdownMenuItem
                            onClick={() => {
                                open(a);
                            }}
                            className="capitalize"
                            key={a?.toString()}
                        >
                            {a}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
