"use client";

import { TableShellProps } from "@/types/data-table";
// import { ISalesOrder } from "@/types/ISales";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState, useTransition } from "react";
import {
    CheckColumn,
    ColumnHeader,
    _FilterColumn,
} from "../columns/base-columns";
import {
    OrderCustomerCell,
    OrderIdCell,
    OrderInvoiceCell,
    OrderMemoCell,
    OrderPriorityFlagCell,
    OrderProductionStatusCell,
    OrderStatus,
} from "../../../app/(v1)/(loggedIn)/sales/orders/components/cells/sales-columns";
import { ISalesOrder } from "@/types/sales";
import { OrderRowAction } from "../actions/sales-menu-actions";
import { DataTable2 } from "../data-table/data-table-2";

import { SalesBatchAction } from "../list-selection-action/sales-selection-action";
import { SalesCustomerFilter } from "../../../app/(v1)/(loggedIn)/sales/orders/components/sales-customer-filter";
import StatusBadge from "../status-badge";
import {
    RowActionCell,
    RowActionMenuItem,
    RowActionMoreMenu,
} from "../data-table/data-table-row-actions";
import { _updateOrderInventoryStatus } from "@/app/(v1)/(loggedIn)/sales/_actions/sales-inventory";
import { toast } from "sonner";

export default function InboundOrdersTableShell<T>({
    data,
    pageInfo,
    searchParams,
}: TableShellProps) {
    const [isPending, startTransition] = useTransition();
    async function setInventoryStatus(item, status) {
        await _updateOrderInventoryStatus(item.id, status, "/sales/inbounds");
        toast.success("Updated!");
    }
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
                    OrderIdCell(row.original, "/sales/order/slug"),
                header: ColumnHeader("Order"),
            },
            {
                accessorKey: "customer",
                header: ColumnHeader("Customer"),
                cell: ({ row }) =>
                    OrderCustomerCell(
                        row.original.customer,
                        "/sales/customer/slug"
                    ),
            },
            {
                accessorKey: "memo",
                header: ColumnHeader("Memo"),
                cell: ({ row }) => OrderMemoCell(row.original.shippingAddress),
            },

            {
                accessorKey: "status",
                header: ColumnHeader("Inventory"),
                cell: ({ row }) => (
                    <StatusBadge
                        status={row.original.inventoryStatus || "Pending"}
                    />
                ),
            },
            ..._FilterColumn(
                "_status",
                "_q",
                "_payment",
                "_customerId",
                "_date"
            ),
            {
                accessorKey: "actions",
                header: ColumnHeader(""),
                size: 15,
                maxSize: 15,
                enableSorting: false,
                cell: ({ row }) => (
                    <RowActionCell>
                        <RowActionMoreMenu>
                            <RowActionMenuItem
                                SubMenu={
                                    <>
                                        {["Ordered", "Available"].map(
                                            (status) => (
                                                <RowActionMenuItem
                                                    onClick={() =>
                                                        setInventoryStatus(
                                                            row.original,
                                                            status
                                                        )
                                                    }
                                                    key={status}
                                                >
                                                    {status}
                                                </RowActionMenuItem>
                                            )
                                        )}
                                    </>
                                }
                            >
                                Inventory
                            </RowActionMenuItem>
                        </RowActionMoreMenu>
                    </RowActionCell>
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
                    id: "status",
                    title: "Status",
                    single: true,
                    options: [
                        { label: "Production Started", value: "Started" },
                        { label: "Production Assigned", value: "Queued" },
                        { label: "Production Completed", value: "Completed" },
                        {
                            label: "Production Not Assigned",
                            value: "Unassigned",
                        },
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
