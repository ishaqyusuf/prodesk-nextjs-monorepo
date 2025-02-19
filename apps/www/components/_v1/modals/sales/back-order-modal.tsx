"use client";

import React, { useState, useTransition } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { IBackOrderForm, ISalesOrder } from "@/types/sales";
import { _useAsync } from "@/lib/use-async";
import BaseModal from "../base-modal";
import { closeModal } from "@/lib/modal";
import { toast } from "sonner";
import { SecondaryCellContent } from "@/components/_v1/columns/base-columns";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import Btn from "@/components/_v1/btn";
// import { UseFormReturn } from "react-hook-form/dist/types";

export default function BackOrderModal() {
    const [pending, startTransition] = useTransition();
    const form = useForm<IBackOrderForm>({
        defaultValues: {
            backOrder: {},
        },
    });
    async function save(order: ISalesOrder) {
        startTransition(async () => {
            closeModal();
            toast.success("Backorder created!");
        });
    }
    const [checkAll, setCheckAll] = useState(false);

    const router = useRouter();
    const [tab, setTab] = useState("main");
    return (
        <BaseModal<ISalesOrder>
            className="sm:max-w-[650px]"
            onOpen={(order) => {
                // console.log(order);
                const bo = {};
                order?.items?.map((o) => {
                    bo[o.meta.uid] = {
                        qty: o.qty,
                        prodQty: o?.meta?.produced_qty,
                    };
                });
                form.reset({
                    backOrder: bo,
                });
            }}
            onClose={() => {}}
            modalName="backOrder"
            Title={({ data: order }) => <div className="">Back Order</div>}
            Subtitle={({ data }) => (
                <div>
                    {" #"}
                    {data?.orderId} {data?.customer?.name}
                </div>
            )}
            Content={({ data }) => (
                <Form {...form}>
                    <Tabs defaultValue={tab} className="">
                        <TabsContent value="main">
                            <div className="-mx-4 sm:mx-0">
                                <ScrollArea
                                    id="employees"
                                    className="h-[350px] hidden sm:block w-full"
                                >
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="px-2">
                                                    <Checkbox
                                                        checked={checkAll}
                                                        onCheckedChange={(
                                                            e
                                                        ) => {
                                                            setCheckAll(
                                                                e as any
                                                            );
                                                            // if(e) {
                                                            data?.items?.map(
                                                                (item) => {
                                                                    form.setValue(
                                                                        `backOrders.${item.meta.uid}.checked` as any,
                                                                        e
                                                                    );
                                                                }
                                                            );
                                                            // }
                                                        }}
                                                    />
                                                </TableHead>
                                                <TableHead className="px-2">
                                                    Items
                                                </TableHead>
                                                <TableHead className="px-2">
                                                    Qty
                                                </TableHead>
                                                <TableHead className="px-2">
                                                    Back Qty
                                                </TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {data?.items?.map((item, i) => (
                                                <BackOrderLine
                                                    key={i}
                                                    form={form}
                                                    item={item}
                                                />
                                            ))}
                                        </TableBody>
                                    </Table>
                                </ScrollArea>
                                <div className="flex justify-end -mb-8 mt-4">
                                    <Btn
                                        isLoading={pending}
                                        size={"sm"}
                                        onClick={() => save(data as any)}
                                    >
                                        Proceed
                                    </Btn>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="invoice"></TabsContent>
                    </Tabs>
                </Form>
            )}
        />
    );
}
function BackOrderLine({ form, item }) {
    const checked = form.watch(`backOrders.${item.meta.uid}.checked`);
    return (
        <TableRow
            className={cn(checked && "bg-green-100 hover:bg-green-100")}
            key={item.id}
        >
            <TableCell className="p-0 px-2">
                {/* <FormField
                                                            control={
                                                                form.control
                                                            }
                                                            name={
                                                                `backOrders.${item.meta.uid}.checked` as any
                                                            }
                                                            render={({
                                                                field
                                                            }) => (
                                                                <FormItem className="">
                                                                    <FormControl>
                                                                        <Checkbox
                                                                            checked={
                                                                                field.value as any
                                                                            }
                                                                            onCheckedChange={
                                                                                field.onChange
                                                                            }
                                                                            // onCheckedChange={e => {
                                                                            //     field.onChange(
                                                                            //         e
                                                                            //     );

                                                                            //     // setCheckAll(
                                                                            //     //     Object.values(
                                                                            //     //         form.getValues(
                                                                            //     //             "backOrders"
                                                                            //     //         )
                                                                            //     //     ).filter(
                                                                            //     //         f =>
                                                                            //     //             (f as any)
                                                                            //     //                 .checked
                                                                            //     //     )
                                                                            //     //         .length ==
                                                                            //     //         data
                                                                            //     //             .items
                                                                            //     //             ?.length
                                                                            //     // );
                                                                            // }}
                                                                        />
                                                                    </FormControl>
                                                                </FormItem>
                                                            )}
                                                        /> */}
            </TableCell>
            <TableCell
                onClick={(e) => {
                    form.setValue(
                        `backOrders.${item.meta.uid}.checked`,
                        !checked
                    );
                }}
                className={cn("p-2 uppercase cursor-pointer")}
            >
                <p className="text-primary">{item.description}</p>
            </TableCell>
            <TableCell className={"p-2"}>
                <p className="text-primary">
                    {item.qty - (item?.meta?.produced_qty || 0)}
                </p>
            </TableCell>
            <TableCell className={"p-2"}>
                <Input
                    type="number"
                    {...form.register(
                        `backOrders.${item.meta.uid}.backQty` as any
                    )}
                    className="w-16 h-7"
                />
            </TableCell>
        </TableRow>
    );
}
