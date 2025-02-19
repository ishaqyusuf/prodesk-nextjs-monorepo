"use server";

import { _cache } from "@/app/(v1)/_actions/_cache/load-data";
import { prisma } from "@/db";
import { unstable_noStore } from "next/cache";

export async function _getSalesRep() {
    unstable_noStore();
    const users = await prisma.users.findMany({
        where: {
            roles: {
                some: {
                    roleId: {
                        gt: 0,
                    },
                },
            },
            reppedProductions: {
                some: {
                    id: { gt: 0 },
                },
            },
        },
        select: {
            id: true,
            name: true,
        },
    });
    return users;
}
