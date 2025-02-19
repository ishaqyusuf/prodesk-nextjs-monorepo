"use server";

import { SalesPrintProps } from "./page";
import { viewSale } from "../../(loggedIn)/sales-v2/overview/_actions/get-sales-overview";
import { composeSalesItems } from "../../(loggedIn)/sales-v2/_utils/compose-sales-items";
import { composePrint } from "./compose-print";

export async function getSalesPrintData(
    slug,
    query: SalesPrintProps["searchParams"]
) {
    const resp = {};

    const order = await viewSale(null, slug, query.deletedAt);

    const salesitems = composeSalesItems(order);

    return composePrint(
        {
            order,
            ...salesitems,
        },
        query
    );
}
