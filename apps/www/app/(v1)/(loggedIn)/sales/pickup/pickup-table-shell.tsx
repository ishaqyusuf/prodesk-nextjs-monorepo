"use client";

import { TableShellProps } from "@/types/data-table";
// import { ISalesOrder } from "@/types/ISales";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState, useTransition } from "react";
import {
    CheckColumn,
    ColumnHeader,
    _FilterColumn,
} from "../../../../../components/_v1/columns/base-columns";
import {
    OrderCustomerCell,
    OrderIdCell,
    OrderMemoCell,
    OrderPriorityFlagCell,
    OrderProductionStatusCell,
} from "../orders/components/cells/sales-columns";
import { ISalesOrder } from "@/types/sales";
import { OrderRowAction } from "../../../../../components/_v1/actions/sales-menu-actions";
import { DataTable2 } from "../../../../../components/_v1/data-table/data-table-2";

import { SalesBatchAction } from "../../../../../components/_v1/list-selection-action/sales-selection-action";
import { SalesCustomerFilter } from "../orders/components/sales-customer-filter";
import { labelValue } from "@/lib/utils";
import { DeliveryStatusCell } from "../../../../../components/_v1/sales/delivery-status-cell";
import { PickupStatusCell } from "../../../../../components/_v1/sales/pickup-status-cell";
import { PickupAction } from "./pickup-action";

export default function PickupTableShell<T>({
    data,
    pageInfo,
    searchParams,
}: TableShellProps) {
    const [isPending, startTransition] = useTransition();

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const columns = useMemo<ColumnDef<ISalesOrder, unknown>[]>(
        () => [
            CheckColumn({ selectedRowIds, setSelectedRowIds, data }),
            {
                maxSize: 10,
                id: "flags",
                cell: ({ row }) => OrderPriorityFlagCell(row.original, true),
            },
            {
                accessorKey: "orderId",
                cell: ({ row }) =>
                    OrderIdCell(row.original, "/sales/production/slug"),
                header: ColumnHeader("Order"),
            },
            {
                accessorKey: "customer",
                header: ColumnHeader("Customer"),
                cell: ({ row }) => OrderCustomerCell(row.original.customer),
            },
            {
                accessorKey: "memo",
                header: ColumnHeader("Memo"),
                cell: ({ row }) => OrderMemoCell(row.original.shippingAddress),
            },
            {
                accessorKey: "production",
                header: ColumnHeader("Production"),
                cell: ({ row }) => OrderProductionStatusCell(row.original),
            },
            {
                accessorKey: "status",
                header: ColumnHeader("Pickup"),
                cell: ({ row }) => <PickupStatusCell order={row.original} />,
            },
            ..._FilterColumn("_status", "_customerId", "_deliveryStatus"),
            {
                accessorKey: "actions",
                header: ColumnHeader(""),
                size: 15,
                maxSize: 15,
                enableSorting: false,
                cell: ({ row }) => (
                    <PickupAction item={row.original}></PickupAction>
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
            BatchAction={SalesBatchAction}
            filterableColumns={[
                {
                    id: "_deliveryStatus",
                    title: "Status",
                    single: true,
                    options: [
                        labelValue("Pending Production", "pending production"),
                        labelValue("Ready For Delivery", "ready"),
                        labelValue("In Transit", "transit"),
                        labelValue("Delivered", "delivered"),
                    ],
                },
                {
                    id: "_payment" as any,
                    title: "Invoice",
                    single: true,
                    options: [
                        { label: "Paid", value: "Paid" },
                        // { label: "Part Paid", value: "Part" },
                        { label: "Pending", value: "Pending" },
                    ],
                },
                SalesCustomerFilter,
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
                    title: "Date",
                },
            ]}
        />
    );
}
