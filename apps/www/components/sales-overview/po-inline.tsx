"use client";

import { salesOverviewStore } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet/store";

import { InlineTextEditor } from "../inline-text-editor";
import Money from "../_v1/money";
import { InfoLine } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet/tabs/sales-info-tab";
import { updateSalesMetaAction } from "@/actions/update-sales-meta-action";
import { refreshTabData } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet/helper";
import { revalidateTable } from "../(clean-code)/data-table/use-infinity-data-table";

export function PoInline() {
    const store = salesOverviewStore();
    const overview = store.overview;
    async function updateCost(value) {
        await updateSalesMetaAction(overview.id, {
            po: value,
        });
        refreshTabData(store.currentTab);
        revalidateTable();
    }
    return (
        <InfoLine
            label="P.O No."
            value={
                <InlineTextEditor
                    onUpdate={updateCost}
                    className="w-24"
                    value={overview?.po}
                >
                    {overview?.po || "Click to add"}
                </InlineTextEditor>
            }
        ></InfoLine>
    );
}
