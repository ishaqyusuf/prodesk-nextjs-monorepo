"use server";

import { dateQuery } from "@/app/(v1)/_actions/action-utils";
import { paginatedAction } from "@/app/_actions/get-action-utils";
import { prisma } from "@/db";
import { Prisma } from "@/db";
import { wherePayableSalesOrders } from "./where";

export default async function getPayablesAction(query) {
    // return prisma.$transaction(async (tx) => {
    const where = wherePayableSalesOrders(query);
    const { pageCount, skip, take } = await paginatedAction(
        query,
        prisma.salesOrders,
        where,
    );
    const data = await prisma.salesOrders.findMany({
        where,
        skip,
        take,
        include: {
            customer: true,
        },
    });
    return {
        data,
        pageCount,
    };
    // });
}
