"use client";

import { TableShellProps } from "@/types/data-table";
// import { ISalesOrder } from "@/types/ISales";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState, useTransition } from "react";
import {
    CheckColumn,
    ColumnHeader,
    ProgressStatusCell,
    _FilterColumn,
} from "../../../../../components/_v1/columns/base-columns";
import {
    OrderPriorityFlagCell,
    ProdOrderCell,
    ProdStatusCell,
} from "../orders/components/cells/sales-columns";
import { ISalesOrder } from "@/types/sales";
import { formatDate } from "@/lib/use-day";
import { DataTable2 } from "../../../../../components/_v1/data-table/data-table-2";
import { ProdActions } from "../../../../../components/_v1/actions/prod-actions";
import ProductionDueDate from "../../../../../components/_v1/sales/prod-due-date";
import { SmartTable } from "../../../../../components/_v1/data-table/smart-table";
import { getProgress } from "@/lib/status";
import StatusBadge from "../../../../../components/_v1/status-badge";

interface Props extends TableShellProps<any> {
    myProd?: Boolean;
    simple?: Boolean;
}
export default function SalesProductionTableShell({
    data,
    pageInfo,
    searchParams,
    simple,
    myProd,
}: Props) {
    const [isPending, startTransition] = useTransition();

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const table = SmartTable<ISalesOrder>(data);
    const columns = useMemo<ColumnDef<ISalesOrder, unknown>[]>(
        () => [
            CheckColumn({ selectedRowIds, setSelectedRowIds, data }),
            {
                maxSize: 10,
                id: "flags",
                cell: ({ row }) => OrderPriorityFlagCell(row.original, true),
            },
            {
                enableSorting: !simple,
                accessorKey: "orderId",
                cell: ({ row }) =>
                    ProdOrderCell(
                        row.original,
                        myProd
                            ? "/tasks/sales-production/slug"
                            : "/sales/production/slug"
                    ),
                header: ColumnHeader("Order"),
            },
            {
                enableSorting: !simple,
                accessorKey: "salesRep",
                header: ColumnHeader("Sales Rep"),
                cell: ({ row }) => {
                    return (
                        <>
                            <p>{row.original.salesRep?.name}</p>
                        </>
                    );
                },
            },

            {
                enableSorting: !simple,
                accessorKey: "dueDate",
                header: ColumnHeader("Due Date"),
                cell: ({ row }) => (
                    <>
                        {!myProd && (
                            <p className="font-semibold">
                                {row.original?.producer?.name}
                            </p>
                        )}
                        <ProductionDueDate
                            hideIcon
                            data={row.original}
                            editable={!myProd}
                        />
                    </>
                ),
            },
            // table.simpleColumn("Inventory", data => {
            //     let status = "Unknown";
            //     if (data.inventoryStatus) status = data.inventoryStatus;
            // let totalQty = 0;
            // let arrivedWarehouse = 0;
            // data.items?.map((item) => {
            //   const pqty = item.meta.produced_qty || 0;
            //   const qty = item.qty || 0;
            //   totalQty += qty;
            //   if (pqty == qty || item.prodCompletedAt) {
            //     arrivedWarehouse += qty;
            //   } else {
            //     const inbountItem = item.inboundOrderItem?.[0];
            //     if (inbountItem?.status === "Arrived Warehouse") {
            //       arrivedWarehouse += inbountItem?.qty;
            //     } else {
            //       if (pqty != qty && (pqty || 0) > 0) {
            //         arrivedWarehouse += qty;
            //       }
            //     }
            //   }
            // });
            // if (arrivedWarehouse == totalQty) status = "Available";
            // else if (arrivedWarehouse > 0) status = "Partial";
            //     return {
            //         story: [
            //             <StatusBadge
            //                 key={1}
            //                 //   score={arrivedWarehouse}
            //                 //   total={totalQty}
            //                 status={status}
            //             />
            //         ]
            //     };
            // }),
            {
                enableSorting: !simple,
                accessorKey: "status",
                header: ColumnHeader("Status"),
                cell: ({ row }) => {
                    return <ProdStatusCell order={row.original} />;
                },
            },
            ..._FilterColumn("_status", "_q", "_date", "_dateType"),
            {
                accessorKey: "actions",
                header: ColumnHeader(""),
                size: 15,
                maxSize: 15,
                enableSorting: false,
                cell: ({ row }) => (
                    <ProdActions myProd={myProd} row={row.original} />
                ),
            },
        ],
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
                    id: "status",
                    title: "Status",
                    single: true,
                    options: [
                        { label: "Started", value: "Started" },
                        { label: "Queued", value: "Queued" },
                        { label: "Completed", value: "Completed" },
                        { label: "Late", value: "Late" },
                    ],
                },
            ]}
            searchableColumns={[
                {
                    id: "_q" as any,
                    title: "orderId, customer",
                },
            ]}
            dateFilterColumns={[
                {
                    id: "_date" as any,
                    title: "Due Date",
                    rangeSwitch: true,
                    filter: {
                        single: true,
                        title: "Filter By",
                        id: "_dateType" as any,
                        defaultValue: "Due Date",
                        options: [
                            { label: "Due Date", value: "prodDueDate" },
                            { label: "Order Date", value: "createdAt" },
                        ],
                    },
                },
            ]}
            hideHeader={simple}
            hideFooter={simple}
        />
    );
}
