"use client";

import { Printer } from "lucide-react";
import { Button } from "../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { PrintOrderMenuAction } from "../actions/sales-menu-actions";

export function SalesBatchAction({ items }) {
    return (
        <>
            {/* <span>{JSON.stringify(items)}</span> */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-label="Toggle columns"
                        variant="default"
                        size="icon"
                        className="ml-auto bg-rose-600 hidden h-8 lg:flex"
                    >
                        <Printer className=" h-4 w-4" />
                        {/* View */}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[150px]">
                    <PrintOrderMenuAction
                        link
                        row={null as any}
                        ids={items?.map((i) => i?.slug)}
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
