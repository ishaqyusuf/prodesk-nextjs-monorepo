"use server";

import { prisma } from "@/db";
import { wherePayableSalesOrders } from "./where";
import { createStatCard } from "@/components/common/stat-cards/utils";
import { formatCurrency, sum } from "@/lib/utils";

export async function getPayableAnalyticsStats(query) {
    const where = wherePayableSalesOrders(query);

    const orders = await prisma.salesOrders.findMany({
        where,
    });
    const sumTotal = sum(orders, "amountDue") || 0;
    const cards = createStatCard([
        {
            label: "Total Payable",
            value: `${formatCurrency.format(sumTotal)}`,
        },
        {
            label: "Orders",
            value: orders.length,
        },
    ]);
    return cards;
}
