import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import * as React from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { store, useAppSelector } from "@/store";
import { IPaymentOptions, ISalesOrderForm } from "@/types/sales";
import { SalesFormCtx } from "@/app/(v1)/(loggedIn)/sales/_actions/sales-form";
import Money from "@/components/_v1/money";
import { cn } from "@/lib/utils";
import { calculateSalesInvoice } from "../sales-invoice-calculator";
export default function InvoiceTableFooter({
    form,
    floatingFooter,
    ctx,
}: {
    floatingFooter;
    ctx: SalesFormCtx;
    form: ISalesOrderForm;
}) {
    const slice = useAppSelector((state) => state.orderItemComponent);
    // const orderForm = useAppSelector((state) => state.orderForm);

    const labourCost = form.watch("meta.labor_cost");
    const discount = form.watch("meta.discount");

    const paymentOption = form.watch("meta.payment_option");
    React.useEffect(() => {
        calculateSalesInvoice({
            form,
            footerInfo: slice.footerInfo,
            settings: ctx.settings,
        });
    }, [
        slice.footerInfo,
        discount,
        labourCost,
        form,
        ctx.settings,
        paymentOption,
    ]);
    return floatingFooter ? (
        <div
            id="floatingFooter"
            className="scroll-mr-16s fixed bottom-0 left-0  right-0 md:grid md:grid-cols-[220px_minmax(0,1fr)]  lg:grid-cols-[240px_minmax(0,1fr)]"
        >
            <div className="hidden  md:block" />
            <div className="lg:gap-10 2xl:grid 2xl:grid-cols-[1fr_300px] ">
                <div className="">
                    <div className="mx-auto mb-4 min-w-0">
                        <Footer
                            form={form}
                            floatingFooter={floatingFooter}
                            className="overflow-hidden rounded-lg  px-8 shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex w-full items-end">
            <div className="flex-1" />
            <Footer form={form} floatingFooter={floatingFooter} className="" />
        </div>
    );
}
function Footer({
    floatingFooter,
    className = "",
    form,
}: {
    form: ISalesOrderForm;
    className?;
    floatingFooter;
}) {
    const { watch, control, register } = form;
    const subTotal = watch("subTotal");
    const grandTotal = watch("grandTotal");
    const tax = watch("tax");
    const taxPercentage = watch("taxPercentage");
    const paymentOption = watch("meta.payment_option");
    const cccPayment = watch("meta.ccc");
    const cccPercentage = watch("meta.ccc_percentage");

    const X = !floatingFooter ? TableRow : ({ children }) => children;
    // <TableCell className="px-2 py-1">
    //   <div className="flex flex-col">{children}</div>
    // </TableCell>
    const FloatRow = floatingFooter ? TableRow : React.Fragment;
    return (
        <div
            className={cn(
                className,
                "shadow-xl bg-slate-50 dark:bg-muted border-slate-300 border z-10",
                floatingFooter ? "rounded-full" : "rounded p-2"
            )}
        >
            <Table id="invoiceFooter" className="w-full">
                <TableBody>
                    <FloatRow>
                        <X>
                            <TableHead>Payment Option</TableHead>
                            <TableCell className="p-1">
                                <Select
                                    value={paymentOption}
                                    onValueChange={(value) => {
                                        form.setValue(
                                            "meta.payment_option",
                                            value as IPaymentOptions
                                        );
                                    }}
                                >
                                    <SelectTrigger className="h-6 w-[120px]">
                                        <SelectValue placeholder="" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {[
                                                "Cash",
                                                "Credit Card",
                                                "Check",
                                                "COD",
                                                "Zelle",
                                            ].map((opt, i) => (
                                                <SelectItem value={opt} key={i}>
                                                    {opt}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                        </X>
                        <X>
                            <TableHead>Labour</TableHead>
                            <TableCell className="p-1">
                                <Input
                                    {...form.register("meta.labor_cost")}
                                    className="h-6 w-16"
                                    prefix="$"
                                />
                            </TableCell>
                        </X>
                        <X>
                            <TableHead>Discount</TableHead>
                            <TableCell className="p-1">
                                <Input
                                    {...form.register("meta.discount")}
                                    className="h-6 w-16"
                                    prefix="$"
                                />
                            </TableCell>
                        </X>
                        <X>
                            <TableHead>Sub Total</TableHead>
                            <TableCell className="whitespace-nowrap p-1">
                                <Money value={subTotal || 0} />
                            </TableCell>
                        </X>
                        <X>
                            <TableHead>Tax ({taxPercentage}%)</TableHead>
                            <TableCell className="whitespace-nowrap p-1">
                                <Money value={tax || 0} />
                            </TableCell>
                        </X>
                        {cccPayment ? (
                            <X>
                                <TableHead>C.C.C ({cccPercentage}%)</TableHead>
                                <TableCell className="whitespace-nowrap p-1">
                                    <Money value={cccPayment || 0} />
                                </TableCell>
                            </X>
                        ) : null}
                        <X>
                            <TableHead>Total</TableHead>
                            <TableCell className="whitespace-nowrap p-1">
                                <Money value={grandTotal || 0} />
                            </TableCell>
                        </X>
                    </FloatRow>
                </TableBody>
            </Table>
        </div>
    );
}
