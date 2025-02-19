"use server";

import { prisma } from "@/db";
import { whereQuery } from "@/lib/db-utils";
import { BaseQuery } from "@/types/action";
import { Prisma } from "@/db";
import { getPageInfo, queryFilter } from "../action-utils";

interface PutawayQueryParams extends Omit<BaseQuery, "status"> {
    status: "All" | "Pending" | "Stored" | "Pending Arrival";
}
export async function getPutwaysAction(query: PutawayQueryParams) {
    // if (!query.status) query.status = "Arrived Warehouse";
    const where = wherePutaway(query);
    const items = await prisma.salesItemSupply.findMany({
        where,
        ...(await queryFilter(query)),
        include: {
            // InboundOrder: true,
            // salesOrderItems: {
            //     include: {
            //         salesOrder: {
            //             select: {
            //                 id: true,
            //                 slug: true,
            //                 orderId: true
            //             }
            //         }
            //     }
            // }
        },
    });
    const pageInfo = await getPageInfo(query, where, prisma.salesItemSupply);
    return {
        pageInfo,
        data: items as any,
    };
}
function wherePutaway(query: PutawayQueryParams) {
    return {};
}
export async function _updateInboundItemLocation(id, data) {
    await prisma.salesItemSupply.update({
        where: { id },
        data: {
            ...data,
            updatedAt: new Date(),
        },
    });
}
