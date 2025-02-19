"use server";

import { prisma } from "@/db";
import { transformData } from "@/lib/utils";
import { ICustomerProfile } from "./type";
import { getPageInfo, queryFilter } from "@/app/(v1)/_actions/action-utils";
import { paginatedAction } from "@/app/_actions/get-action-utils";

export async function getCustomerProfiles(query = {}) {
    //    const where = wheresalesPayments(query);
    // return prisma.$transaction(async (tx) => {
    const where = {};
    const { pageCount, skip, take } = await paginatedAction(
        query,
        prisma.customerTypes,
        where
    );
    const data = await prisma.customerTypes.findMany({
        where,
        skip,
        take,
    });
    return {
        data: data as any as ICustomerProfile[],
        pageCount,
    };
    // });
}
export async function saveCustomerProfile(data: ICustomerProfile) {
    const { id, ...rest } = data;

    const saveData = transformData(rest) as any;
    console.log(saveData);

    if (!id)
        await prisma.customerTypes.create({
            data: saveData,
        });
    else
        await prisma.customerTypes.update({
            where: { id },
            data: saveData,
        });
}
export async function deleteCustomerProfile(id) {
    await prisma.customers.updateMany({
        where: {
            customerTypeId: id,
        },
        data: {
            customerTypeId: null,
        },
    });
    await prisma.customerTypes.delete({
        where: {
            id,
        },
    });
}
export async function makeDefaultCustomerProfile(id) {
    await prisma.customerTypes.updateMany({
        where: {
            defaultProfile: true,
        },
        data: {
            defaultProfile: false,
        },
    });
    await prisma.customerTypes.update({
        where: {
            id,
        },
        data: {
            defaultProfile: true,
        },
    });
}
