"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderAssignmentSalesDoor, useAssignmentData } from "..";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Btn from "@/components/_v1/btn";

import { useAssignment } from "../use-assignment";
import { OrderProductionSubmissions } from "@prisma/client";
import FormInput from "@/components/common/controls/form-input";

import { __revalidateProductions, _submitProduction } from "../_action/actions";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface Props {
    salesDoor: OrderAssignmentSalesDoor;
    assignment: OrderAssignmentSalesDoor["assignments"][0];
    isGarage: boolean;
    groupIndex;
}
export default function SubmitDoorProduction({
    salesDoor,
    assignment,
    isGarage,
    groupIndex,
}: Props) {
    const data = useAssignmentData();
    const modal = useAssignment(
        data.data.isProd ? { type: "prod" } : undefined
    );
    const group = data.data.doorGroups[groupIndex];
    const [open, onOpenChange] = useState(false);

    const form = useForm<Partial<OrderProductionSubmissions>>({
        defaultValues: {
            assignmentId: assignment.id,
            salesOrderId: assignment.orderId,
            salesOrderItemId: assignment.itemId,
            note: "",
            lhQty: 0,
            rhQty: 0,
            // leftHandle: false,
        },
    });
    const isLeft = assignment.__report.handle == "LH";
    const qtyKey = isLeft ? "lhQty" : "rhQty";
    const qty = form.watch(isLeft ? "lhQty" : "rhQty");

    useEffect(() => {
        if (open) {
            form.setValue(qtyKey, 0);
            // console.log(assignment.__report);
        }
        // }
    }, [open]);
    const [saving, startSaving] = useTransition();
    async function submit() {
        startSaving(async () => {
            const _data = form.getValues();
            if (!qty) {
                toast.success("Invalid qty");
                return;
            }

            await _submitProduction(_data);
            onOpenChange(false);
            toast.success("Submitted successfully");
            modal.open(data.data.id);
            await __revalidateProductions();
        });
    }

    function toggleSubmitProduction() {
        onOpenChange(!open);
    }
    return (
        <DropdownMenu open={open} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger
                asChild
                // disabled={group.report.pendingAssignment == 0}
            >
                <Button
                    onClick={toggleSubmitProduction}
                    // disabled={group.report.pendingAssignment == 0}

                    disabled={
                        assignment.__report?.pending == 0 || data.data.readOnly
                    }
                    size={"sm"}
                    variant={"outline"}
                    className="p-2 h-6"
                >
                    Submit
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="left" className="mx-4">
                <Form {...form}>
                    <Card className="w-[500px] border-transparent">
                        <CardHeader>
                            <CardTitle>Submit Production</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2 col-span-2">
                                    <Label>Qty</Label>
                                    <div className="flex gap-2 flex-wrap">
                                        {Array(assignment.__report.pending)
                                            .fill(0)
                                            .map((_, i) => (
                                                <Button
                                                    size={"sm"}
                                                    onClick={(e) => {
                                                        form.setValue(
                                                            isLeft
                                                                ? "lhQty"
                                                                : "rhQty",
                                                            i + 1
                                                        );
                                                    }}
                                                    variant={
                                                        (qty || 0) >= i + 1
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                    className="w-10"
                                                    key={i}
                                                >
                                                    {i + 1}
                                                </Button>
                                            ))}
                                    </div>
                                </div>
                                <FormInput
                                    className="col-span-2"
                                    type="textarea"
                                    label="Note"
                                    control={form.control}
                                    name="note"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex w-full justify-end">
                                <Btn isLoading={saving} onClick={submit}>
                                    Submit
                                </Btn>
                            </div>
                        </CardFooter>
                    </Card>
                </Form>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
