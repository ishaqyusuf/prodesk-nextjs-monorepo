"use client";

import { useRouter } from "next/navigation";
import { Cell } from "../columns/base-columns";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { useState, useTransition } from "react";
import { Button } from "../../ui/button";
import { toast } from "sonner";
import { OrderStatus } from "../../../app/(v1)/(loggedIn)/sales/orders/components/cells/sales-columns";
import { updateSalesDelivery } from "@/app/(v1)/(loggedIn)/sales/_actions/_sales-pickup";
import { MenuItem } from "../data-table/data-table-row-actions";

export function DeliveryStatusCell({ order }: { order }) {
    const [isPending, startTransition] = useTransition();
    const route = useRouter();
    async function submit(status) {
        startTransition(async () => {
            //   await updateWorkOrderStatus(workOrder.id, status);
            await updateSalesDelivery(order.id, status);
            setIsOpen(false);
            toast.success("Status Updated!");
            // route.refresh();
        });
    }
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Cell>
            <div className="">
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 p-0">
                            <OrderStatus order={order} delivery />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-[185px] p-4 grid gap-2 text-sm"
                    >
                        {["Ready", "In Transit", "Returned", "Delivered"]?.map(
                            (e) => (
                                <MenuItem
                                    onClick={(_e) => submit(e)}
                                    className="cursor-pointer hover:bg-accent"
                                    key={e}
                                >
                                    {e}
                                </MenuItem>
                            )
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Cell>
    );
}
