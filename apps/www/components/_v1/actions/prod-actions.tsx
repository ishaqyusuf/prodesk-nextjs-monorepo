"use client";

import { ISalesType, ISalesOrder } from "@/types/sales";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { MoreHorizontal, View } from "lucide-react";
import Link from "next/link";
import { PrintOrderMenuAction } from "./sales-menu-actions";
import { RowActionMenuItem } from "../data-table/data-table-row-actions";
import { _updateOrderInventoryStatus } from "@/app/(v1)/(loggedIn)/sales/_actions/sales-inventory";
import { toast } from "sonner";

export interface IOrderRowProps {
    row: ISalesOrder;
    viewMode?: Boolean;
    estimate?: Boolean;
    print?(mode: ISalesType | "production");
    myProd?: Boolean;
}
export function ProdActions(props: IOrderRowProps) {
    const { row, myProd } = props;
    const _linkDir = myProd
        ? `/tasks/sales-production/${row.orderId}`
        : `/sales/production/${row.orderId}`;
    async function setInventoryStatus(status) {
        await _updateOrderInventoryStatus(row.id, status, "/sales/productions");
        toast.success("Updated!");
    }
    return (
        <div className="">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open Menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[185px]">
                    <Link href={_linkDir}>
                        <DropdownMenuItem>
                            <View className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            View
                        </DropdownMenuItem>
                    </Link>
                    <PrintOrderMenuAction link myProd={myProd} row={row} />
                    <RowActionMenuItem
                        SubMenu={
                            <>
                                {["Available", "Pending Items"].map(
                                    (status) => (
                                        <RowActionMenuItem
                                            onClick={() =>
                                                setInventoryStatus(status)
                                            }
                                            key={status}
                                        >
                                            {status}
                                        </RowActionMenuItem>
                                    )
                                )}
                            </>
                        }
                    >
                        Inventory
                    </RowActionMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
