"use server";

import { SalesQueryParams } from "@/types/sales";
import { prisma } from "@/db";
import { _revalidate } from "../../../_actions/_revalidate";
import { getSales } from "@/data-access/sales";

export async function getSalesDelivery(query: SalesQueryParams) {
    query.deliveryOption = "delivery";
    if (!query.status) query.statusNot = "delivered";
    return await getSales(query);
}
export async function updateSalesDelivery(id, status) {
    const updateData: any = {
        status,
    };
    if (status == "Delivered") updateData.deliveredAt = new Date();

    const ids = Array.isArray(id) ? id : [id];
    // console.log(ids);
    await prisma.salesOrders.updateMany({
        where: {
            id: {
                in: ids,
            },
        },
        data: {
            status,
            deliveredAt: status == "Delivered" ? new Date() : null,
            updatedAt: new Date(),
        },
    });
    _revalidate("delivery");
}
