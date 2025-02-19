"use client";

import { TableShellProps } from "@/types/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState, useTransition } from "react";
import {
    ColumnHeader,
    Cell,
    PrimaryCellContent,
    SecondaryCellContent,
} from "../../../../../components/_v1/columns/base-columns";
import { DataTable2 } from "../../../../../components/_v1/data-table/data-table-2";

import { BuilderFilter } from "../../../../../components/_v1/filters/builder-filter";
import {
    DeleteRowAction,
    EditRowAction,
    RowActionCell,
} from "../../../../../components/_v1/data-table/data-table-row-actions";

import { SmartTable } from "../../../../../components/_v1/data-table/smart-table";
import { IRole } from "@/types/hrm";
import PageHeader from "../../../../../components/_v1/page-header";
import { Button } from "@/components/ui/button";
import { Icons } from "../../../../../components/_v1/icons";
import { useRoleModal } from "./role-modal";
import { deleteRoleAction } from "./roles.actions";

export default function RolesTableShell({
    data,
    pageInfo,
    searchParams,
}: TableShellProps<IRole>) {
    const [isPending, startTransition] = useTransition();

    const [selectedRowIds, setSelectedRowIds] = useState<number[]>([]);
    const table = SmartTable<IRole>(data);
    const columns = useMemo<ColumnDef<IRole, unknown>[]>(
        () => [
            // table.simpleColumn("#", (data) => ({
            //     story: [
            //         table.primaryText(data.id),
            //         table.secondary(data.createdAt),
            //     ],
            // })),
            {
                id: "title",
                header: ColumnHeader("Role"),
                cell: ({ row }) => (
                    <Cell>
                        {/* link={`/community/project/slug`} slug={row.original.slug} */}
                        <PrimaryCellContent>
                            {row.original.name}
                        </PrimaryCellContent>
                    </Cell>
                ),
            },
            table.simpleColumn("Permissions", (data) => ({
                story: [
                    table.status(
                        `${data._count?.RoleHasPermissions} Permissions`
                    ),
                ],
            })),
            {
                accessorKey: "actions",
                header: ColumnHeader(""),
                size: 15,
                maxSize: 15,
                enableSorting: false,
                cell: ({ row }) => (
                    <RowActionCell>
                        <EditRowAction
                            onClick={(e) => {
                                modal.open(row.original.id);
                            }}
                        />
                        <DeleteRowAction
                            row={row.original}
                            action={deleteRoleAction}
                        />
                    </RowActionCell>
                ),
            },
        ],
        [data, isPending]
    );
    const modal = useRoleModal();
    return (
        <>
            <PageHeader
                title="Roles"
                Action={() => (
                    <>
                        <Button
                            size="sm"
                            onClick={() => {
                                modal.open();
                            }}
                        >
                            <Icons.add className="size-4 mr-4" />
                            <span>New</span>
                        </Button>
                    </>
                )}
            />
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
        </>
    );
}
