"use server";

import { prisma } from "@/db";

export async function updateDueDateAction(id, date) {
    const r = await prisma.salesOrders.update({
        where: {
            id,
        },
        data: {
            goodUntil: date,
            updatedAt: new Date(),
        },
    });
    return r;
}
