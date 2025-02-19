import {
    Cell,
    CheckColumn,
    ColumnHeader,
    PrimaryCellContent,
    SecondaryCellContent,
    _FilterColumn,
} from "@/components/_v1/columns/base-columns";
import { OrderCustomerCell } from "@/app/(v1)/(loggedIn)/sales/orders/components/cells/sales-columns";
import {
    DeleteRowAction,
    RowActionCell,
    RowActionMenuItem,
    RowActionMoreMenu,
} from "@/components/_v1/data-table/data-table-row-actions";
import Money from "@/components/_v1/money";
import StatusBadge from "@/components/_v1/status-badge";
import { ISalesOrderItem } from "@/types/sales";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";

export const InboundColumns = (selectedRowIds, setSelectedRowIds, data) =>
    useMemo<ColumnDef<ISalesOrderItem, unknown>[]>(
        () => [
            CheckColumn({ selectedRowIds, setSelectedRowIds, data }),
            {
                id: "title",
                header: ColumnHeader("Item"),
                cell: ({ row }) => (
                    <Cell>
                        <PrimaryCellContent>
                            {row.original.description}
                        </PrimaryCellContent>
                        <SecondaryCellContent>
                            {row.original?.salesOrder?.orderId}
                        </SecondaryCellContent>
                    </Cell>
                ),
            },
            {
                accessorKey: "customer",
                header: ColumnHeader("Customer"),
                cell: ({ row }) =>
                    OrderCustomerCell(row.original.salesOrder.customer),
            },
            {
                id: "supplier",
                header: ColumnHeader("Supplier"),
                cell: ({ row }) => (
                    <Cell>
                        <SecondaryCellContent>
                            {row.original.supplier}
                        </SecondaryCellContent>
                    </Cell>
                ),
            },
            {
                id: "sales",
                header: ColumnHeader("Sales"),
                cell: ({ row }) => (
                    <Cell>
                        <Money value={row.original.total} />
                    </Cell>
                ),
            },
            {
                id: "qty",
                header: ColumnHeader("Qty"),
                cell: ({ row }) => (
                    <Cell>
                        <PrimaryCellContent>
                            {row.original.qty}
                        </PrimaryCellContent>
                    </Cell>
                ),
            },
            {
                accessorKey: "invoice",
                header: ColumnHeader("Invoice"),
                cell: ({ row }) => {
                    const order = row.original.salesOrder;
                    const { amountDue = 0, grandTotal = 0 } = order;
                    const status =
                        amountDue == grandTotal
                            ? "Pending"
                            : (amountDue || 0) < (grandTotal || 0)
                            ? "Part Paid"
                            : "Paid";
                    return (
                        <Cell>
                            <StatusBadge>{status}</StatusBadge>
                        </Cell>
                    );
                },
            },
            ..._FilterColumn("_q", "_supplier"),
            {
                accessorKey: "actions",
                header: ColumnHeader(""),
                size: 15,
                maxSize: 15,
                enableSorting: false,
                cell: ({ row }) => (
                    <RowActionCell>
                        {/* <RowActionMoreMenu></RowActionMoreMenu> */}
                    </RowActionCell>
                ),
            },
        ], //.filter(Boolean) as any,
        [data]
    );
