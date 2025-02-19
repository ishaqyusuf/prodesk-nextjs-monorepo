"use client";

import Modal from "@/components/common/modal";
import { SalesOverview } from "../../type";
import { useForm } from "react-hook-form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/controls/form-input";
import { _submitDelivery } from "./submit-delivery";
import { toast } from "sonner";
import { _revalidate } from "@/app/(v1)/_actions/_revalidate";
import { useModal } from "@/components/common/modal/provider";

interface Props {
    order: SalesOverview;
}
export interface DeliveryForm {
    deliveries: {
        [id in number]: {
            qty;
            maxQty;
        };
    };
    orderId;
}
export default function CreateDeliveryModal({ order }: Props) {
    // const { data: order } = useDataPage<SalesOverview>();
    const defaultValues: DeliveryForm = {
        deliveries: {},
        orderId: order.id,
    };
    const items = order.items.map((item) => {
        const delivered = order.itemDeliveries.filter(
            (i) => i.orderItemId == item.id
        );
        const deliveredQty = delivered
            .map((d) => d.qty)
            .reduce((a, b) => a + b, 0);
        defaultValues.deliveries[item.id] = {
            qty: 0,
            maxQty: (item.qty || 0) - deliveredQty,
        };
        return {
            qty: item.qty,
            id: item.id,
            description: item.description,
            deliveries: delivered,
            deliveredQty,
        };
    });
    const form = useForm({
        defaultValues,
    });
    const modal = useModal();
    async function submitDelivery() {
        try {
            const formData = form.getValues();
            Object.entries(formData.deliveries).map(([k, v]) => {
                if (Number(v.qty) > Number(v.maxQty)) {
                    console.log(v);

                    toast.error(
                        "Invalid!. Delivery Qty cannot be more than deliverable!"
                    );
                    throw new Error();
                }
            });
            _submitDelivery(formData);
            _revalidate("overview-order");
            modal?.close();
        } catch (error) {}
    }
    return (
        <Modal.Content size={"lg"}>
            <Form {...form}>
                <Modal.Header title="Create Delivery" />
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Item</TableHead>
                                <TableHead>Delivered</TableHead>
                                <TableHead>Delivery</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow className="" key={item.id}>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell align="center">
                                        {item.deliveredQty}
                                        {" of "}
                                        {item.qty}
                                    </TableCell>
                                    <TableCell>
                                        <FormInput
                                            control={form.control}
                                            name={
                                                `deliveries.${item.id}.qty` as any
                                            }
                                            type="number"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </Form>
            <Modal.Footer submitText="Approved" onSubmit={submitDelivery} />
        </Modal.Content>
    );
}
