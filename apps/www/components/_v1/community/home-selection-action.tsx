"use client";

import { Printer } from "lucide-react";
import { Button } from "../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { PrintOrderMenuAction } from "../actions/sales-menu-actions";
import { dispatchSlice } from "@/store/slicers";
import { deepCopy } from "@/lib/deep-copy";
import { openModal } from "@/lib/modal";

export function HomeBatchAction({ items }) {
    return (
        <>
            {/* <span>{JSON.stringify(items)}</span> */}

            <Button
                aria-label="Toggle columns"
                variant="default"
                size="icon"
                onClick={() => {
                    dispatchSlice("printHomes", {
                        homes: deepCopy(items),
                    });
                }}
                className="ml-auto bg-rose-600 hover:bg-rose-700 hidden h-8 lg:flex"
            >
                <Printer className=" h-4 w-4" />
                {/* View */}
            </Button>
            <Button
                onClick={() => {
                    openModal("activateProduction", items);
                }}
            >
                Send to Production
            </Button>
        </>
    );
}
