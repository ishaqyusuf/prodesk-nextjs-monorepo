"use client";

import React, { useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { _useAsync } from "@/lib/use-async";
import Btn from "../btn";
import BaseModal from "./base-modal";
import { closeModal, openModal } from "@/lib/modal";
import { toast } from "sonner";

import { useForm } from "react-hook-form";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { CustomerTypes } from "@prisma/client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { IProject } from "@/types/community";
import { useAppSelector } from "@/store";
import { loadStaticList } from "@/store/slicers";
import { staticBuildersAction } from "@/app/(v1)/(loggedIn)/settings/community/builders/action";
import { projectSchema } from "@/lib/validations/community-validations";
import { saveProject } from "@/app/(v1)/_actions/community/projects";
import { getSalesPaymentCustomers } from "@/app/(v1)/_actions/sales-payment/get-sales-payment-customer";
import { Table, TableBody, TableCell, TableRow } from "../../ui/table";
import {
    PrimaryCellContent,
    SecondaryCellContent,
} from "../columns/base-columns";
import Money from "../money";
import { sum } from "@/lib/utils";
import { ScrollArea } from "../../ui/scroll-area";
import { ICustomer } from "@/types/customers";
import { deleteSalesPayment } from "@/app/(v1)/(loggedIn)/sales/_actions/sales-payment";
import { Button } from "../../ui/button";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { ISalesPayment } from "@/types/sales";

export default function DeletePaymentPrompt() {
    const [action, setAction] = useState<"yes" | "no">("no");
    const route = useRouter();
    async function onSubmit(row: ISalesPayment) {
        startTransition(async () => {
            const amountDue = (row.order.amountDue || 0) + row.amount;
            await deleteSalesPayment({
                id: row.id,
                orderId: row.order.id,
                amountDue,
                amount: row.amount,
                refund: action == "yes",
            });
            toast.success("Deleted!");
            closeModal();
            route.refresh();
        });
    }
    const [isLoading, startTransition] = useTransition();

    return (
        <BaseModal<ISalesPayment>
            className="sm:max-w-[550px]"
            onOpen={async (data) => {
                setAction("no");
            }}
            onClose={() => {}}
            modalName="deletePaymentPrompt"
            Title={({ data }) => <div>Delete Sales Payment</div>}
            Content={({ data }) => (
                <div>
                    <SecondaryCellContent>
                        You are about to delete a sales payment.
                        <br /> Do you want to refund{" "}
                        <Money value={data?.amount} />{" "}
                        {" back to customer wallet?"}
                    </SecondaryCellContent>
                    <RadioGroup
                        className="my-2"
                        defaultValue={action}
                        onValueChange={(v) => setAction(v as any)}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="option-one" />
                            <Label htmlFor="option-one">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="option-two" />
                            <Label htmlFor="option-two">No</Label>
                        </div>
                    </RadioGroup>
                </div>
            )}
            Footer={({ data }) => (
                <>
                    <Button onClick={() => closeModal()} variant={"secondary"}>
                        Cancel
                    </Button>
                    <Btn
                        isLoading={isLoading}
                        onClick={() => onSubmit(data as any)}
                        variant={"destructive"}
                    >
                        Delete
                    </Btn>
                </>
            )}
        />
    );
}
