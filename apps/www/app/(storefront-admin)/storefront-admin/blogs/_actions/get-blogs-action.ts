"use server";

import { paginatedAction } from "@/app/_actions/get-action-utils";
import { prisma } from "@/db";
import { BaseQuery } from "@/types/action";
import { Prisma } from "@/db";

interface QueryProps extends BaseQuery {}
export async function getBlogsAction(query: QueryProps) {
    // return prisma.$transaction(async (tx) => {
    const where: Prisma.BlogsWhereInput = {};
    const { pageCount, skip, take } = await paginatedAction(
        query,
        prisma.blogs,
        where,
    );
    const data = await prisma.blogs.findMany({
        where,
        skip,
        take,
        include: {},
    });
    return {
        data,
        pageCount,
    };
    // });
}
