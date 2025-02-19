"use client";

import { ServerPromiseType } from "@/types";
import getPayablesAction from "./_actions/get-payables";
import React from "react";
import useDataTableColumn from "@/components/common/data-table/columns/use-data-table-columns";
import { PayableCells } from "./payable-cells";
import { DataTable2 } from "@/components/_v1/data-table/data-table-2";

export type PayableProm = ServerPromiseType<typeof getPayablesAction>;
interface Props {
    promise: PayableProm["Promise"];
}
export default function PayablesTable({ promise }: Props) {
    const { data, pageCount } = React.use(promise);
    const table = useDataTableColumn(
        data,
        (ctx) => [
            ctx.Column("Customer", PayableCells.Customer),
            ctx.Column("Order", PayableCells.Order),
            ctx.Column("Invoice", PayableCells.Invoice),
            ctx.Column("Due Date", PayableCells.DueDate),
            ctx.ActionColumn(PayableCells.Options),
        ],
        true,
        { sn: true, filterCells: ["_q", "_date", "_dateType"] }
    );
    return (
        <div>
            <DataTable2
                columns={table.columns}
                data={data}
                pageCount={pageCount}
                dateFilterColumns={[
                    {
                        id: "_date" as any,
                        title: "Due Date",
                        // rangeSwitch: true,
                        // filter: {
                        //     single: true,
                        //     title: "Filter By",
                        //     id: "_dateType" as any,
                        //     defaultValue: "Due Date",
                        //     options: [
                        //         {
                        //             label: "Due Date",
                        //             value: "productionDueDate",
                        //         },
                        //         { label: "Unit Date", value: "createdAt" },
                        //         {
                        //             label: "Sent to Prod at",
                        //             value: "sentToProductionAt",
                        //         },
                        //     ],
                        // },
                    },
                ]}
                searchableColumns={[{ id: "_q" as any, title: "payables" }]}
            />
        </div>
    );
}
