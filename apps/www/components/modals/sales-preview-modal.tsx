"use client";

import { SalesType } from "@/app/(clean-code)/(sales)/types";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { Dialog, DialogContent } from "../ui/dialog";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import SalesPrintDisplay from "@/app/(v2)/printer/sales/sales-print-display";
import { getSalesPrintData } from "@/app/(v2)/printer/sales/get-sales-print-data";
import { OrderBasePrinter } from "@/app/(v2)/printer/sales/order-base-printer";

export function useSalesPreviewModal() {
    const [q, setQ] = useQueryStates({
        salesPreviewSlug: parseAsString,
        salesPreviewType: parseAsStringEnum(["order", "quote"] as SalesType[]),
    });

    return {
        q,
        isOpened: q.salesPreviewSlug != null,
        preview(id, salesPreviewType: typeof q.salesPreviewType) {
            setQ({
                salesPreviewSlug: id,
                salesPreviewType,
            });
        },
        close() {
            setQ(null);
        },
    };
}
export function SalesPreviewModal({}) {
    const ctx = useSalesPreviewModal();
    const [data, setData] = useState(null as any);
    useEffect(() => {
        if (ctx.q.salesPreviewSlug) {
            getSalesPrintData(ctx.q.salesPreviewSlug, {
                mode: ctx.q.salesPreviewType,
                preview: true,
            }).then((result) => {
                console.log({ result });

                setData(result as any);
            });
        }
    }, [ctx.q.salesPreviewSlug]);
    return (
        <Dialog
            onOpenChange={(e) => {
                ctx.close();
            }}
            open={ctx.isOpened}
        >
            <DialogContent className="w-[800px]s max-w-4xl">
                <ScrollArea className="h-[90vh] overflow-auto">
                    {data && (
                        <OrderBasePrinter mode={ctx.q.salesPreviewType as any}>
                            <SalesPrintDisplay
                                data={data}
                                slug={ctx.q.salesPreviewSlug}
                            />
                        </OrderBasePrinter>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
