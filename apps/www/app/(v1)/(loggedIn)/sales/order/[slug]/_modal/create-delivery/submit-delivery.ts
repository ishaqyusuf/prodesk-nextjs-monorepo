"use server";

import { prisma } from "@/db";
import { DeliveryForm } from ".";
import { userId } from "@/app/(v1)/_actions/utils";

export async function _submitDelivery(data: DeliveryForm) {
    const approvedById = await userId();

    const _ = await prisma.orderItemDelivery.createMany({
        data: Object.entries(data.deliveries)
            .map(([k, v]) => {
                return {
                    approvedById,
                    orderId: data.orderId,
                    orderItemId: +k,
                    meta: {},
                    qty: Number(v.qty),
                };
            })
            .filter((s) => s.qty > 0),
    });
    return _;
}
