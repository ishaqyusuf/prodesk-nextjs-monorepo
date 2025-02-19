"use client";

import { DataTable2 } from "@/components/_v1/data-table/data-table-2";
import { SmartTable } from "@/components/_v1/data-table/smart-table";
import { useMemo, useState, useTransition } from "react";
import { ICommissions } from "./commissions";
import { TableShellProps } from "@/types/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { _FilterColumn } from "@/components/_v1/columns/base-columns";
import Money from "@/components/_v1/money";

export default function CommissionsTable<T>({
    data,
    pageInfo,
    searchParams,
}: TableShellProps<ICommissions>) {
    const [isPending, startTransition] = useTransition();

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const table = SmartTable<ICommissions>(data);
    // const _columns = table.Columns([
    //   table.column("id", "#", {
    //     content: (data) => ({
    //       link: ``,
    //       story: [
    //         table.primaryText(data.InboundOrder?.orderId),
    //         table.secondary(data.createdAt),
    //       ],
    //     }),
    //   }),
    // ]);
    const columns = useMemo<ColumnDef<ICommissions, unknown>[]>(
        () => [
            table.column("id", "#", {
                maxSize: 10,
                content(data) {
                    return {
                        story: [
                            table.primaryText(data.id),
                            table.secondary(data.createdAt),
                        ],
                    };
                },
            }),
            table.simpleColumn("Order", (data) => ({
                link: `/sales/order/${data.order?.slug}`,
                story: [table.primaryText(data.order.orderId)],
            })),
            table.simpleColumn("Sales Rep", (data) => ({
                // link: `/sales/order/${data.order?.slug}`,
                story: [table.primaryText(data.user?.name)],
            })),

            table.simpleColumn("Amount", (data) => ({
                story: [<Money value={data.amount} key={0} />],
            })),
            table.simpleStatus("status"),

            ..._FilterColumn("_q"),
            {
                accessorKey: "actions",
                //    header: ColumnHeader(""),
                size: 15,
                maxSize: 15,
                enableSorting: false,
                cell: ({ row }) => <></>,
            },
        ], //.filter(Boolean) as any,
        [data, isPending]
    );
    return (
        <DataTable2
            searchParams={searchParams}
            columns={columns}
            pageInfo={pageInfo}
            data={data}
            filterableColumns={[
                {
                    id: "Status",
                    title: "Status",
                    single: true,
                    options: [
                        { label: "All", value: "All" },
                        {
                            label: "Pending Putaway",
                            value: "Pending",
                        },
                        { label: "Stored", value: "Stored" },
                        {
                            label: "Pending Arrival",
                            value: "Pending Arrival",
                        },
                    ],
                },
            ]}
            searchableColumns={[
                {
                    id: "_q" as any,
                    title: "",
                },
            ]}

            //  deleteRowsAction={() => void deleteSelectedRows()}
        />
    );
}
