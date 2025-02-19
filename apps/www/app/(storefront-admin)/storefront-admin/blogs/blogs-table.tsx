"use client";

import { ServerPromiseType } from "@/types";
import { getBlogsAction } from "./_actions/get-blogs-action";
import React from "react";
import useDataTableColumn from "@/components/common/data-table/columns/use-data-table-columns";
import { TitleCell } from "./_cells/title-cell";
import { DataTable2 } from "@/components/_v1/data-table/data-table-2";

type Prom = ServerPromiseType<typeof getBlogsAction>;

interface Props {
    promise: Prom["Promise"];
}
export interface BlogCells {
    item: Prom["Item"];
}
export default function BlogsTable({ promise }: Props) {
    const { data, pageCount } = React.use(promise);
    const table = useDataTableColumn(data, (ctx) => [
        ctx.Column("Title", TitleCell),
    ]);
    return (
        <div>
            <DataTable2
                columns={table.columns}
                data={data}
                pageCount={pageCount}
                searchParams={[{ id: "_q" as any, title: "Blogs" }]}
            />
        </div>
    );
}
