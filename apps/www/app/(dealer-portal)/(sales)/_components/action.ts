"use server";

import { userId } from "@/app/(v1)/_actions/utils";
import { getSales, SalesQueryParams } from "@/data-access/sales";
import { ISalesType } from "@/types/sales";

export async function getDealerSales(
    query: SalesQueryParams,
    type: ISalesType = "order"
) {
    const dealerId = await userId();
    query.dealerId = dealerId;
    query.type = type;
    return await getSales(query);
}
