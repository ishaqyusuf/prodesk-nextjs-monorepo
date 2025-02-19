"use client";

import React from "react";

import { DataTable2 } from "@/components/_v1/data-table/data-table-2";

import useDataTableColumn from "@/components/common/data-table/columns/use-data-table-columns";
import { Cells } from "./cells";
import { ServerPromiseType } from "@/types";
import { getCustomerProfiles } from "./actions";

interface Props {
    searchParams?;
    promise: ServerPromiseType<typeof getCustomerProfiles>["Promise"];
}
export default function CustomerProfileTableShell({
    promise,
    searchParams,
}: Props) {
    const { data, pageCount } = React.use(promise);
    const table = useDataTableColumn(
        data,
        (ctx) => [
            ctx.Column("Profile Name", Cells.ProfileName),
            ctx.Column("Sales Margin", Cells.SalesMargin),
            ctx.Column("Net Terms", Cells.NetTerms),
            ctx.Column("Quote Expiry", Cells.Quote),
            ctx.ActionColumn(Cells.Options),
        ],
        true,
        { sn: false, filterCells: ["_q"] }
    );
    return (
        <DataTable2
            searchParams={searchParams}
            columns={table.columns}
            pageCount={pageCount}
            data={data}
            searchableColumns={[
                {
                    id: "_q" as any,
                    title: "",
                },
            ]}
        />
    );
}
