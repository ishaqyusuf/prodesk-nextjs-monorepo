"use server";

import { SelectOption } from "@/app/(clean-code)/type";
import { getSalesProdWorkersdta } from "../data-access/production-workers-dta";

export async function getSalesProdWorkersAsSelectOption(): Promise<
    SelectOption[]
> {
    const w = await getSalesProdWorkersdta();
    return w?.map((s) => ({
        data: s,
        label: s.name,
        value: s.id,
    }));
}
