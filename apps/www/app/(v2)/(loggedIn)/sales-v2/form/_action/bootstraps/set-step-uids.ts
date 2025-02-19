"use server";

import { prisma } from "@/db";
import { generateRandomString } from "@/lib/utils";

export async function setStepsUids() {
    const steps = await prisma.dykeSteps.findMany({
        where: {
            uid: null,
        },
    });
    const stepProducts = await prisma.dykeStepProducts.findMany({
        where: {
            uid: null,
        },
    });
    // console.log([steps[0], steps.length, stepProducts.length]);

    // return [steps.length, stepProducts.length];
    await Promise.all(
        steps.map(async (s) => {
            await prisma.dykeSteps.update({
                where: {
                    id: s.id,
                },
                data: {
                    uid: generateRandomString(5),
                    updatedAt: new Date(),
                },
            });
        })
    );
    await Promise.all(
        stepProducts.map(async (s) => {
            await prisma.dykeStepProducts.update({
                where: {
                    id: s.id,
                },
                data: {
                    uid: generateRandomString(5),
                    updatedAt: new Date(),
                },
            });
        })
    );
    return [steps.length, stepProducts.length];
}
