"use server";

import { SearchParamsType } from "@/components/(clean-code)/data-table/search-params";
import { prisma } from "@/db";
import { AsyncFnType } from "@/types";

import {
    inifinitePageInfo,
    pageQueryFilter,
} from "@/app/(clean-code)/_common/utils/db-utils";
import { Prisma } from "@/db";
import { dueDateAlert } from "../../utils/production-utils";
import { authId } from "@/app/(v1)/_actions/utils";
import { sum } from "@/lib/utils";
import { qtyControlsByType } from "../../utils/item-control-utils";
import {
    composeSalesStatKeyValue,
    composeSalesStatus,
} from "@/data/compose-sales";
import { overallStatus } from "../../data-access/dto/sales-stat-dto";
import { whereSales } from "@/utils/db/where.sales";

export type GetProductionListPage = AsyncFnType<
    typeof getProductionListPageAction
>;
export type GetProductionList = AsyncFnType<typeof getProductionListAction>;
export async function getProductionTasksListPageAction(
    query: SearchParamsType,
) {
    const q = { ...query };
    q["production.assignedToId"] = await authId();

    return await getProductionListPageAction(q);
}
export async function getProductionListPageAction(query: SearchParamsType) {
    const prodList = await getProductionListAction(query);
    const excludes: (keyof SearchParamsType)[] = [
        "sort",
        "size",
        "start",
        "production.assignedToId",
        "sales.type",
    ];
    const q = Object.entries(query)?.filter(
        ([a, b]) => b && !excludes.includes(a as any),
    );
    const queryCount = q?.length;
    const dueToday = !query.start
        ? await getProductionListAction({
              "sales.type": query["sales.type"],
              "production.assignedToId": query["production.assignedToId"],
              "production.status": "due today",
          })
        : [];
    const pastDue = !query.start
        ? await getProductionListAction({
              "sales.type": query["sales.type"],
              "production.assignedToId": query["production.assignedToId"],
              "production.status": "past due",
          })
        : [];
    const excludesIds = [...dueToday, ...pastDue].map((a) => a.id);
    const others = prodList.filter((p) => !excludesIds?.includes(p.id));

    const result = await inifinitePageInfo(
        query,
        whereSales(query),
        prisma.salesOrders,
        [
            ...[...dueToday, ...pastDue]
                .map(transformProductionList)
                .sort(
                    (a, b) =>
                        (new Date(b.alert.date) as any) -
                        (new Date(a.alert.date) as any),
                ),
            ...others.map(transformProductionList),
        ],
        // [...dueToday, ...pastDue, ...others].map(transformProductionList)
    );
    return result;
}
export async function getProductionListAction(query: SearchParamsType) {
    const where = whereSales(query);

    const whereAssignments: Prisma.OrderItemProductionAssignmentsWhereInput[] =
        (
            Array.isArray(where?.AND)
                ? where.AND?.map((a) => a.assignments?.some).filter(Boolean)
                : where?.assignments
                  ? [where?.assignments]
                  : []
        ) as any;

    const data = await prisma.salesOrders.findMany({
        where,
        ...pageQueryFilter(query),

        select: {
            id: true,
            orderId: true,
            salesRep: {
                select: { name: true },
            },
            stat: true,
            itemControls: {
                select: {
                    qtyControls: true,
                    assignments: {
                        select: {
                            id: true,
                        },
                    },
                },
            },
            assignments: {
                where: {
                    deletedAt: null,
                    AND:
                        whereAssignments?.length > 1
                            ? whereAssignments
                            : undefined,
                    ...(whereAssignments?.length == 1
                        ? whereAssignments[0]
                        : {}),
                },
                select: {
                    submissions: {
                        where: {
                            deletedAt: null,
                        },
                        select: {
                            lhQty: true,
                            qty: true,
                            rhQty: true,
                        },
                    },
                    lhQty: true,
                    rhQty: true,
                    qtyAssigned: true,
                    dueDate: true,
                    assignedTo: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });
    return data;
}
function transformProductionList(item: GetProductionList[number]) {
    // item.assignments;
    const dueDate = item.assignments.map((d) => d.dueDate).filter(Boolean);

    const alert = dueDateAlert(dueDate);

    const totalAssigned = sum(
        item.assignments.map((p) => p.qtyAssigned || sum([p.lhQty, p.rhQty])),
    );
    const stats = composeSalesStatKeyValue(item.stat);

    const totalCompleted = sum(
        item.assignments.map((a) =>
            sum(a.submissions.map((s) => s.qty || sum([s.lhQty, s.rhQty]))),
        ),
    );
    const completed = totalAssigned == totalCompleted;
    // if (completed) alert.date = null;

    return {
        completed,
        totalAssigned,
        totalCompleted,
        orderId: item.orderId,
        alert,
        salesRep: item?.salesRep?.name,
        assignedTo: Array.from(
            new Set(item.assignments.map((a) => a.assignedTo?.name)),
        ).join(" & "),
        uuid: item.orderId,
        id: item.id,
        stats,
        status: overallStatus(item.stat),
    };
}
