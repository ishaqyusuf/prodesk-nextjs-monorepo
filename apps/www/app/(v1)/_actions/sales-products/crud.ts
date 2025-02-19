"use server";

import { prisma } from "@/db";
import { BaseQuery } from "@/types/action";
import { getPageInfo, queryFilter } from "../action-utils";
import { Prisma } from "@/db";
import { slugModel, transformData } from "@/lib/utils";
import { queryBuilder } from "@/lib/db-utils";

export interface LegacyProductsQueryParamsProps extends BaseQuery {}
export async function getLegacyProducts(query: LegacyProductsQueryParamsProps) {
    const builder = await queryBuilder<Prisma.ProductVariantsWhereInput>(
        query,
        prisma.productVariants,
    );
    builder.searchQuery("description", "variantTitle", "title");
    return builder.response(
        await prisma.productVariants.findMany({
            ...builder.queryFilters,
            where: builder.getWhere(),
            include: {
                product: {
                    select: {
                        category: true,
                        id: true,
                    },
                },
            },
        }),
    );
    const where = whereLegacyProducts(query);
    const items = await prisma.productVariants.findMany({
        where,
        include: {
            product: {
                select: {
                    category: true,
                    id: true,
                },
            },
        },
        ...(await queryFilter(query)),
    });

    const pageInfo = await getPageInfo(query, where, prisma.productVariants);

    return {
        pageInfo,
        data: items as any,
    };
}
export async function createProductAction(
    product: { id?; title; category },
    variant: { price; variantTitle; title? },
) {
    let id = product.id;
    if (!id) {
        id = (
            await prisma.inventoryProducts.create({
                data: {
                    ...transformData({}),
                    title: product.title,
                    category: product.category,
                    slug: await slugModel(
                        product.title,
                        prisma.inventoryProducts,
                    ),
                    meta: {},
                },
            })
        ).id;
    }
    const title = `${variant.variantTitle} ${product.title}`;
    await prisma.productVariants.create({
        data: {
            ...transformData({}),
            product: {
                connect: {
                    id,
                },
            },
            variantTitle: variant.variantTitle,
            title,
            slug: await slugModel(title, prisma.productVariants),
            price: variant.price,
            meta: {},
        },
    });
}
function whereLegacyProducts(query: LegacyProductsQueryParamsProps) {
    const q = {
        contains: query._q || undefined,
    } as any;
    const where: Prisma.ProductVariantsWhereInput = {
        description: q,
        title: q,
        variantTitle: q,
        product: {
            title: q,
            category: q,
        },
    };
    return where;
}
export async function deleteLegacyProductAction(id) {
    await prisma.productVariants.delete({
        where: { id },
    });
}
