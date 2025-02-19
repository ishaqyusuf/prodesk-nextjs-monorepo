import { Input } from "@/components/ui/input";
import { TableCell } from "@/components/ui/table";
import { store, useAppSelector } from "@/store";

import { convertToNumber, toFixed } from "@/lib/use-number";
import React, { memo, useContext } from "react";

import { updateFooterInfo } from "@/store/invoice-item-component-slice";
import { SalesInvoiceCellProps } from "./sales-invoice-tr";
import Money from "@/components/_v1/money";
import { Label } from "@/components/ui/label";
import { addPercentage } from "@/lib/utils";
import { InvoiceItemRowContext } from "../invoice-item-row-context";
import { FormField } from "@/components/ui/form";
import { ISalesOrder } from "@/types/sales";

function QtyCostCell({ rowIndex, form }: SalesInvoiceCellProps) {
    const { register } = form;
    const baseKey = `items.${rowIndex}`;

    //   const itemTotal = form.watch([`${baseKey}.qty`, `${baseKey}.price`] as any);
    const profitRate = form.watch("meta.sales_percentage");
    const profileEstimate = form.watch("meta.profileEstimate");
    const mockPercent = form.watch("meta.mockupPercentage");

    const slice = useAppSelector((state) => state.orderItemComponent);
    const toggleMockup = useAppSelector(
        (state) => state.orderItemComponent?.showMockup
    );
    const { qty, price, rate } = useContext(InvoiceItemRowContext);
    // const [qty, setQty] = React.useState(
    //     form.getValues(`${baseKey}.qty` as any)
    // );
    // const [price, setPrice] = React.useState(
    //     form.getValues(`${baseKey}.price` as any)
    // );
    // const [rate, setRate] = React.useState(
    //     form.getValues(`${baseKey}.rate` as any)
    // );
    // React.useEffect(() => {
    //     if (rowIndex == slice.itemPriceData?.rowIndex) {
    //         const { price: _price, qty: _qty } = slice.itemPriceData;
    //         setQty(_qty);
    //         setPrice(_price);
    //     }
    // }, [slice.itemPriceData]);

    // if (rowIndex == 0)   }, [slice.itemPriceData]);
    // React.useEffect(() => {
    //   setQty(form.getValues(`${baseKey}.qty` as any));
    //   setPrice(form.getValues(`${baseKey}.price` as any));
    // }, [rowIndex, form]);
    React.useEffect(() => {
        // form.setValue(`items.${rowIndex}.qty`, qty);
        let _rate =
            profileEstimate && profitRate
                ? toFixed(Number(price) / Number(profitRate || 1))
                : price;
        if (toggleMockup) _rate = addPercentage(_rate, mockPercent);
        form.setValue(`items.${rowIndex}.rate`, _rate);
        // setRate(_rate);
        const total = toFixed(convertToNumber(qty * _rate, 0));
        // if(form.getValue(``))
        form.setValue(`items.${rowIndex}.total`, +total);
        store.dispatch(updateFooterInfo({ rowIndex, total }));
    }, [
        qty,
        price,
        rowIndex,
        profitRate,
        profileEstimate,
        toggleMockup,
        mockPercent,
    ]);
    return (
        <>
            <TableCell id="qty" className="p-0 px-1">
                <FormField<ISalesOrder>
                    name={`items.${rowIndex}.qty`}
                    control={form.control}
                    render={({ field }) => (
                        <Input
                            type="number"
                            className="h-8 w-full p-1 text-center font-medium"
                            {...field}
                        />
                    )}
                />
            </TableCell>
            <TableCell id="price" className="p-0 px-1">
                <FormField<ISalesOrder>
                    name={`items.${rowIndex}.price`}
                    control={form.control}
                    render={({ field }) => (
                        <Input
                            type="number"
                            className="h-8 w-full p-1 text-center font-medium"
                            {...field}
                            disabled={toggleMockup}
                        />
                    )}
                />
            </TableCell>
            {profileEstimate && (
                <TableCell align="right" id="estimate" className="p-0 px-1">
                    <Label className="whitespace-nowrap">
                        <Money value={rate} />
                    </Label>
                </TableCell>
            )}
        </>
    );
}
export default memo(
    QtyCostCell,
    (prev, next) => prev.rowIndex == next.rowIndex
);
