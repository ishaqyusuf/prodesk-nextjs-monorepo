"use client";

import { salesOverviewStore } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet/store";

import { InlineTextEditor } from "../inline-text-editor";
import Money from "../_v1/money";
import { InfoLine } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet/tabs/sales-info-tab";
import { updateSalesDeliveryCostAction } from "@/actions/update-sales-delivery-cost-action";
import { refreshTabData } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet/helper";
import { revalidateTable } from "../(clean-code)/data-table/use-infinity-data-table";

export function SalesDeliveryCostInline() {
    const store = salesOverviewStore();
    const overview = store.overview;
    async function updateCost(value) {
        await updateSalesDeliveryCostAction(overview.id, Number(value));
        refreshTabData(store.currentTab);
        revalidateTable();
    }
    return (
        <InfoLine
            label="Delivery Cost"
            value={
                <InlineTextEditor
                    onUpdate={updateCost}
                    className="w-24"
                    value={overview?.invoice?.delivery}
                >
                    <Money value={overview?.invoice?.delivery} />
                </InlineTextEditor>
            }
        ></InfoLine>
    );
}
