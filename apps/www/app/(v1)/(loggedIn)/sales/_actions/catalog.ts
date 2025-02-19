"use server";

import { prisma } from "@/db";
import { getPageInfo, queryFilter } from "../../../_actions/action-utils";

interface Props {
    page?;
    per_page?;
    q?;
}
export async function loadCatalog(filter: Props) {
    if (!filter.per_page) filter.per_page = 20;
    const inputQ = { contains: filter.q || undefined };
    const where = {
        OR: [
            { title: inputQ },
            {
                variants: {
                    some: {
                        variantTitle: inputQ,
                        price: {
                            gte: 1,
                        },
                    },
                },
            },
        ],
        variants: {
            some: {
                id: {
                    gt: 0,
                },
                price: {
                    gt: 0,
                },
            },
        },
    };
    const prods = await prisma.inventoryProducts.findMany({
        include: {
            variants: true,
        },
        where,
        ...((await queryFilter(filter)) as any),
    });
    const pageInfo = await getPageInfo(filter, where, prisma.inventoryProducts);
    return {
        items: prods,
        pageInfo,
    };
}
