"use server";

import { prisma } from "@/db";
import { transformData } from "@/lib/utils";
import { EmployeeProfile } from "@prisma/client";
import { getPageInfo } from "../action-utils";
import { _cache } from "../_cache/load-data";

export async function getProfiles(query) {
    const pageInfo = await getPageInfo({}, {}, prisma.employeeProfile);

    return {
        pageInfo,
        data: (await prisma.employeeProfile.findMany({})) as any,
    };
}
export async function getStaticEmployeeProfiles() {
    return await _cache(
        "customerProfiles",
        async () => (await prisma.employeeProfile.findMany({})) as any
    );
}

export async function saveEmployeeProfile(data: EmployeeProfile) {
    const { id, ...rest } = data;
    if (!id)
        await prisma.employeeProfile.create({
            data: transformData(rest) as any,
        });
    else
        await prisma.employeeProfile.update({
            where: { id },
            data: transformData(rest) as any,
        });
}
export async function setEmployeeProfileAction(id, profileId) {
    await prisma.users.update({
        where: {
            id,
        },
        data: {
            employeeProfile: {
                connect: {
                    id: profileId,
                },
            },
        },
    });
}
export async function deleteEmployeeProfile(id) {
    await prisma.users.updateMany({
        where: {
            employeeProfileId: id,
        },
        data: {
            employeeProfileId: null,
        },
    });
    await prisma.employeeProfile.delete({
        where: {
            id,
        },
    });
}

