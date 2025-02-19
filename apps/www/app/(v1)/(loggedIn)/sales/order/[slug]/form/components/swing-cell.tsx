"use client";

import { TableCell } from "@/components/ui/table";
import { SalesInvoiceCellProps } from "./sales-invoice-tr";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import AutoComplete2 from "@/components/_v1/auto-complete-tw";
import { FormField } from "@/components/ui/form";
import { ISalesOrder } from "@/types/sales";

export default function SwingCell({
    rowIndex,
    ctx,
    form,
}: SalesInvoiceCellProps) {
    const getSwingValue = () => form.getValues(`items.${rowIndex}.swing`);
    const [swing, setSwing] = useState<string | undefined>(
        getSwingValue() || undefined
    );
    useEffect(() => {
        // setSwing(getSwingValue() || undefined);
    }, [rowIndex]);
    return (
        <TableCell id="swing" className="p-1">
            <FormField<ISalesOrder>
                name={`items.${rowIndex}.swing`}
                control={form.control}
                render={({ field }) => (
                    <Input className="h-8 w-16  p-1  font-medium" {...field} />
                    // <AutoComplete2
                    //     allowCreate
                    //     fluid
                    //     {...field}
                    //     options={ctx?.swings}
                    // />
                )}
            />

            {/* <Input
        className="h-8 w-16  p-1  font-medium"
        value={swing}
        onChange={(e) => {
          setSwing(e.target.value);
          form.setValue(`items.${rowIndex}.swing`, e.target.value);
        }}
      /> */}
            {/* <AutoComplete
        keyName={`items.${rowIndex}.swing`}
        className="w-24"
        id="swing"
        allowCreate
        form={form}
        list={ctx?.swings}
      /> */}
        </TableCell>
    );
}
