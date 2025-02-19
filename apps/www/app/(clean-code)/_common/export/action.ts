"use server";

import { prisma } from "@/db";
import { ExportTypes } from "./type";
import { SalesQueryParams, whereSales } from "@/data-access/sales";

export async function getExportData(type: ExportTypes, query, includes) {
    switch (type) {
        case "order":
            return await getOrderExportData(query, includes);
            break;
    }
}

async function getOrderExportData(query: SalesQueryParams, select) {
    query.type = "order";
    const where = await whereSales(query);
    return await prisma.salesOrders.findMany({
        where,
        select,
    });
}
