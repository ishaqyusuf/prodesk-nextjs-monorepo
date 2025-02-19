"use client";

import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { useState } from "react";

export default function CommandInputPage({}) {
    const [v, vc] = useState("");
    return (
        <>
            <Command shouldFilter={false}>
                <CommandInput value={v} onValueChange={vc} />
                <CommandList></CommandList>
            </Command>
        </>
    );
}
