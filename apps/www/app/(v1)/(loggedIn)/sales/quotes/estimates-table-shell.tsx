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
    OrderInvoiceCell,
    OrderMemoCell,
    SalesCustomerCell,
} from "../orders/components/cells/sales-columns";
import { ISalesOrder } from "@/types/sales";
import { OrderRowAction } from "../../../../../components/_v1/actions/sales-menu-actions";
import { DataTable2 } from "../../../../../components/_v1/data-table/data-table-2";
import { SalesBatchAction } from "../../../../../components/_v1/list-selection-action/sales-selection-action";
import { SalesCustomerFilter } from "../orders/components/sales-customer-filter";
import { useMediaQuery } from "react-responsive";
import { screens } from "@/lib/responsive";
import SalesEstimateMobileCell from "../../../../../components/_v1/mobile/sales/sales-estimate-mobile-cell";
import { SmartTable } from "../../../../../components/_v1/data-table/smart-table";
import PageHeader from "../../../../../components/_v1/page-header";
import NewSalesBtn from "@/app/(v1)/(loggedIn)/sales/orders/components/new-sales-btn";

export default function EstimatesTableShell({
    data,
    pageInfo,
    searchParams,
}: TableShellProps) {
    const [isPending, startTransition] = useTransition();

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);

    const table = SmartTable<ISalesOrder>(data);
    const isMobile = useMediaQuery(screens.xs);
    const columns = useMemo<ColumnDef<ISalesOrder, unknown>[]>(
        () =>
            isMobile
                ? [
                      {
                          id: "order",
                          cell: ({ row }) => (
                              <SalesEstimateMobileCell order={row.original} />
                          ),
                      },
                      ..._FilterColumn(
                          "_q",
                          "_status",
                          "_date",
                          "_customerId",
                          "_withDeleted"
                      ),
                  ]
                : [
                      CheckColumn({ selectedRowIds, setSelectedRowIds, data }),
                      {
                          accessorKey: "orderId",
                          cell: ({ row }) =>
                              OrderIdCell(
                                  row.original,
                                  row.original.isDyke
                                      ? `/sales-v2/overview/${row.original.type}/slug`
                                      : "/sales/quote/slug"
                              ),
                          header: ColumnHeader("Quote #"),
                      },
                      {
                          accessorKey: "customer",
                          header: ColumnHeader("Customer"),
                          cell: ({ row }) => (
                              <SalesCustomerCell order={row.original} />
                          ),
                          //   OrderCustomerCell(
                          //       row.original.customer,
                          //       "/sales/customer/slug"
                          //   ),
                      },
                      {
                          accessorKey: "memo",
                          header: ColumnHeader("Address"),
                          cell: ({ row }) =>
                              OrderMemoCell(row.original.shippingAddress),
                      },
                      table.simpleColumn("Rep", (data) => ({
                          story: [table.secondary(data.salesRep?.name)],
                      })),
                      {
                          accessorKey: "invoice",
                          header: ColumnHeader("Total"),
                          cell: ({ row }) => (
                              <OrderInvoiceCell
                                  order={row.original}
                                  isEstimate
                              />
                          ),
                      },

                      ..._FilterColumn("_q", "_status", "_date", "_customerId"),
                      {
                          accessorKey: "actions",
                          header: ColumnHeader(""),
                          size: 15,
                          maxSize: 15,
                          enableSorting: false,
                          cell: ({ row }) => (
                              <OrderRowAction estimate row={row.original} />
                          ),
                      },
                  ],
        [data, isPending]
    );
    return (
        <>
            <PageHeader
                title="Sales Quotes"
                permissions={["editOrders"]}
                Action={() => <NewSalesBtn type="quote" />}
                // newLink="/sales/edit/estimate/new"
            />
            <DataTable2
                searchParams={searchParams}
                columns={columns}
                pageInfo={pageInfo}
                data={data}
                mobile
                BatchAction={SalesBatchAction}
                filterableColumns={[SalesCustomerFilter]}
                searchableColumns={[
                    {
                        id: "_q" as any,
                        title: "estimate id, customer...",
                    },
                ]}
                dateFilterColumns={[
                    {
                        id: "_date" as any,
                        title: "Date",
                    },
                ]}
            />
        </>
    );
}
