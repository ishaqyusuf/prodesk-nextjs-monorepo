"use client";

import { TableShellProps } from "@/types/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState, useTransition } from "react";
import {
    ColumnHeader,
    Cell,
    PrimaryCellContent,
    DateCellContent,
} from "../columns/base-columns";
import { DataTable2 } from "../data-table/data-table-2";

import { BuilderFilter } from "../filters/builder-filter";
import {
    DeleteRowAction,
    RowActionCell,
    RowActionMenuItem,
    RowActionMoreMenu,
} from "../data-table/data-table-row-actions";

import { EmployeeProfile } from "@prisma/client";
import { deleteEmployeeProfile } from "@/app/(v1)/_actions/hrm/employee-profiles";
import { IInboundOrder } from "@/types/sales-inbound";
import StatusBadge from "../status-badge";
import { Badge } from "../../ui/badge";
import { InboundStatus } from "@/lib/status";
import { updateInboundStatusAction } from "@/app/(v1)/_actions/sales-inbound/update-inbound-status";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SmartTable } from "../data-table/smart-table";

export default function InboundsTableShell<T>({
    data,
    pageInfo,
    searchParams,
}: TableShellProps<IInboundOrder>) {
    const [isPending, startTransition] = useTransition();
    // console.log(data);
    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const route = useRouter();
    async function updateStatus(slug, status) {
        await updateInboundStatusAction(slug, status);
        toast.success("Updated");
        route.refresh();
    }
    const table = SmartTable<IInboundOrder>(data);

    const columns = useMemo<ColumnDef<IInboundOrder, unknown>[]>(
        () => [
            table.simpleColumn(
                "#/Date",
                (data) => ({
                    link: `/sales/inbounds/putaway?_q=${data.slug}`,
                    story: [
                        table.primaryText(data.orderId),
                        table.secondary(data.createdAt),
                    ],
                }),
                { id: "id" }
            ),

            table.simpleColumn("Putaway", (data) => {
                const putAway = data.inboundItems.filter(
                    (ii) => ii.putawayAt
                ).length;
                const total = data.inboundItems.length;
                return {
                    story: [table.status(`${putAway}/${total}`)],
                };
            }),
            table.simpleStatus("status"),
            {
                accessorKey: "actions",
                header: ColumnHeader(""),
                size: 15,
                maxSize: 15,
                enableSorting: false,
                cell: ({ row }) => (
                    <RowActionCell>
                        <DeleteRowAction
                            row={row.original}
                            action={deleteEmployeeProfile}
                        />
                        <RowActionMoreMenu>
                            <RowActionMenuItem
                                SubMenu={
                                    <>
                                        {InboundStatus.map((status) => (
                                            <RowActionMenuItem
                                                onClick={() =>
                                                    updateStatus(
                                                        row.original.slug,
                                                        status
                                                    )
                                                }
                                                key={status}
                                            >
                                                {status}
                                            </RowActionMenuItem>
                                        ))}
                                    </>
                                }
                            >
                                Status
                            </RowActionMenuItem>
                        </RowActionMoreMenu>
                    </RowActionCell>
                ),
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
            filterableColumns={[BuilderFilter]}
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
