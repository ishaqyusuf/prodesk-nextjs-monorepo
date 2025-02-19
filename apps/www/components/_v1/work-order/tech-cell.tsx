"use client";

import { IProject } from "@/types/community";
import { Cell, StatusCell } from "../columns/base-columns";
import Money from "../money";
import { Button } from "../../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useState, useTransition } from "react";
import { updateProjectMeta } from "@/app/(v1)/_actions/community/projects";
import Btn from "../btn";
import { WorkOrders } from "@prisma/client";
import { IWorkOrder } from "@/types/customer-service";
import { useAppSelector } from "@/store";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { assignTech } from "@/app/(v1)/_actions/customer-services/assign-tech";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "../../ui/command";
import { updateWorkOrderStatus } from "@/app/(v1)/_actions/customer-services/update-status";
import { revalidatePath } from "next/cache";

interface Props {
    workOrder: IWorkOrder;
}
export default function WorkOrderTechCell({ workOrder }: Props) {
    const techEmployees = useAppSelector((s) => s.slicers.staticTechEmployees);
    const [isPending, startTransition] = useTransition();
    const route = useRouter();
    async function submit(e) {
        startTransition(async () => {
            await assignTech(workOrder.id, e.id);
            setIsOpen(false);
            toast.success("Tech Assigned");
            route.refresh();
        });
    }
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Cell>
            <div className="">
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-dashed w-full"
                        >
                            <span className="whitespace-nowrap">
                                {workOrder.tech
                                    ? workOrder.tech.name
                                    : "Select"}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-[185px] p-4 grid gap-2 text-sm"
                    >
                        {techEmployees?.map((e) => (
                            <DropdownMenuItem
                                onClick={(_e) => submit(e)}
                                className="cursor-pointer hover:bg-accent"
                                key={e.id}
                            >
                                {e.name}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Cell>
    );
}
export function WorkOrderStatusCell({ workOrder }: Props) {
    const [isPending, startTransition] = useTransition();
    const route = useRouter();
    async function submit(status) {
        startTransition(async () => {
            await updateWorkOrderStatus(workOrder.id, status);
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
                            <StatusCell status={workOrder.status} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="w-[185px] p-4 grid gap-2 text-sm"
                    >
                        {[
                            "Pending",
                            "Scheduled",
                            "Incomplete",
                            "Completed",
                        ]?.map((e) => (
                            <DropdownMenuItem
                                onClick={(_e) => submit(e)}
                                className="cursor-pointer hover:bg-accent"
                                key={e}
                            >
                                {e}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Cell>
    );
}
