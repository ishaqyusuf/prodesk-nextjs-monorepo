"use server";

import { prisma } from "@/db";
import { deleteItems } from "./data";

export async function restoreItems() {
    const rems = await prisma.salesOrderItems.findMany({
        where: {
            deletedAt: {
                not: null,
            },
            id: {
                notIn: deleteItems.map((i) => i.id),
            },
        },
        // take: 1000
    });
    const ids = rems
        .filter(({ id }, index) => index < 5001)
        .map(({ id }) => id);
    // return rems.length;
    const items = await prisma.salesOrderItems.updateMany({
        where: {
            deletedAt: {
                not: null,
            },
            id: {
                // notIn: deleteItems.map((i) => i.id),
                in: ids,
            },
        },
        data: {
            deletedAt: null,
        },
    });

    return `pending delete: ${rems.length - 1000}`;
}

