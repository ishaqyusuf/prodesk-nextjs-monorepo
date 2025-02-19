"use client";

import { Icons } from "@/components/_v1/icons";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createPortal } from "react-dom";

export default Object.assign(({ children }) => {
    const Element = document?.getElementById("headerNav");
    if (!Element) return;
    return createPortal(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button size="icon" className="w-6 h-6" variant="outline">
                    <Icons.more className="size-4" />
                </Button>
            </DropdownMenuTrigger>
        </DropdownMenu>,
        Element
    );
}, {});
