"use server";

import { prisma } from "@/db";
import { permissions } from "@/lib/data/role";
import { queryBuilder, whereQuery } from "@/lib/db-utils";
import { BaseQuery } from "@/types/action";
import { IRoleForm } from "@/types/hrm";
import { Prisma } from "@/db";
import { transformData } from "@/lib/utils";

interface Props extends BaseQuery {}
export async function _getRoles(query: Props) {
    if (!query.sort) {
        query.sort = "name";
        query.sort_order = "asc";
    }
    const builder = await queryBuilder<Prisma.RolesWhereInput>(
        query,
        prisma.roles,
        false,
    );
    return builder.response(
        await prisma.roles.findMany({
            where: builder.getWhere(),
            ...builder.queryFilters,
            include: {
                _count: {
                    select: {
                        RoleHasPermissions: true,
                    },
                },
            },
        }),
    );
}
