"use client";

import FPageNav from "@/components/(clean-code)/fikr-ui/f-page-nav";
import { FPageTabs } from "@/components/(clean-code)/fikr-ui/f-page-tabs";
import {
    DealerStatus,
    GetDealersAction,
    GetDealersPageTabAction,
} from "./action";
import { use } from "react";
import { Badge } from "@/components/ui/badge";
import { useDataTableColumn2 } from "@/components/common/data-table/columns/use-data-table-columns";
import { Cells } from "./cells";
import { DataTable } from "@/app/_components/data-table";
import { TableToolbar } from "@/app/_components/data-table/toolbar";
import { useSearchParams } from "next/navigation";

interface Props {
    response?;
    tabResp?;
}
export default function PageClient({ response, tabResp }: Props) {
    const { data, pageCount }: GetDealersAction = use(response);
    const h = useSearchParams();
    const status: DealerStatus = h.get("status") as any;
    const table = useDataTableColumn2(
        data,
        {
            pageCount,
            checkable: false,
            cellVariants: {
                size: "sm",
            },
        },
        (ctx) => [
            ctx.Column("Dealer", Cells.Dealer),
            ...(status == "Pending Approval"
                ? [ctx.ActionColumn(Cells.MainActions)]
                : status == "Rejected"
                ? []
                : status == "Restricted"
                ? []
                : [ctx.ActionColumn(Cells.MainActions)]),
        ]
    );
    return (
        <>
            <FPageNav>
                <span></span>
            </FPageNav>
            <section className="content">
                <DataTable {...table.props}>
                    <TableToolbar>
                        <TableToolbar.Search />
                    </TableToolbar>
                    <DataTable.Table />
                    <DataTable.Footer />
                </DataTable>
            </section>
        </>
    );
}
