"use server";

import { prisma } from "@/db";
import {
    InboundOrderableItemQueryParamProps,
    getOrderableItems
} from "./get-orderable-items";
import { IInboundOrder } from "@/types/sales-inbound";
import { uniqueBy } from "@/lib/utils";
export interface GetInboundFormReponse {
    form;
    suppliers: string[];
    list;
}
export async function getInboundForm(
    slug = null,
    query: InboundOrderableItemQueryParamProps
): Promise<GetInboundFormReponse> {
    let form: IInboundOrder = slug
        ? await prisma.salesItemSupply.findUnique({
              where: {
                  id: Number(slug)
              },
              include: {}
          })
        : ({} as any);
    const salesItemIds = form?.inboundItems?.map(i => i.salesOrderItemId);
    query.salesOrderItemIds = salesItemIds;
    const orderables = await getOrderableItems(query);
    const suppliers = await prisma.salesOrderItems.findMany({
        distinct: "supplier",
        where: {
            supplier: {
                not: null
            }
        },
        select: {
            supplier: true
        }
    });
    return {
        form,
        suppliers: uniqueBy(suppliers, "supplier")
            .map(s => s.supplier)
            ?.filter(Boolean),
        list: orderables
    };
}
