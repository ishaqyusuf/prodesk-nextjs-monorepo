"use client";

import { salesOverviewStore } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet/store";

import { InfoLine } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet/tabs/sales-info-tab";

import { useState } from "react";
import { DatePicker } from "../_v1/date-range-picker";
import { useAction } from "next-safe-action/hooks";
import { updateSalesDateAction } from "@/actions/update-sales-date-action";
import { toast } from "sonner";
import { refreshTabData } from "@/app/(clean-code)/(sales)/_common/_components/sales-overview-sheet/helper";
import { revalidateTable } from "../(clean-code)/data-table/use-infinity-data-table";

export function SalesDateInline() {
    const store = salesOverviewStore();
    const overview = store.overview;
    const [value, setValue] = useState(store.overview?.createdAt);
    const updateSalesDate = useAction(updateSalesDateAction, {
        onSuccess(args) {
            toast.success("Date updated");
            refreshTabData(store.currentTab);
            revalidateTable();
            setValue(args.input.newDate);
        },
        onError(e) {
            toast.error("unable to complete");
        },
    });
    return (
        <InfoLine
            label="Date Created"
            value={
                <DatePicker
                    // disabled={(date) => date > new Date()}
                    setValue={(e) => {
                        updateSalesDate.execute({
                            id: store.overview.id,
                            newDate: e,
                        });
                    }}
                    className="w-auto h-8"
                    value={value}
                />
            }
        ></InfoLine>
    );
}
