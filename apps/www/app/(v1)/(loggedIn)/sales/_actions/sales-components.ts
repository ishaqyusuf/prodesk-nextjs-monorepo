"use server";
import { prisma } from "@/db";
import { convertToNumber } from "@/lib/use-number";
import { ISalesWizardForm } from "@/types/post";
import { IOrderComponent, WizardKvForm } from "@/types/sales";
import { OrderInventory, Prisma } from "@prisma/client";

export interface ISaveOrderResponse {
    components: IOrderComponent[];
    updates: IOrderInventoryUpdate[];
}
export interface IOrderInventoryUpdate {
    component: IOrderComponent;
    parent?: IOrderComponent;
    currentData?: OrderInventory;
    checked?;
}
export async function saveSalesComponentAction(
    args: WizardKvForm,
    wizards: ISalesWizardForm[]
) {
    const parentIds: any = {};
    const expectingParent: any = {};
    await Promise.all(
        wizards
            .sort((a, b) => (!a.depId ? -1 : !b.depId ? 1 : 0))
            .map(async (wiz) => {
                const comp = args[wiz.uuid];
                if (comp && Boolean(comp?.title?.trim())) {
                    let inventory: any = null;
                    const dep = args[wiz.depId];
                    const depWiz = wizards.find((w) => w.uuid == wiz.depId);
                    const where: Prisma.OrderInventoryWhereInput = {
                        name: comp.title,
                        category: wiz.category,
                    };
                    const OR: any = [
                        {
                            OR: [
                                { price: null },
                                { price: convertToNumber(comp.price) },
                            ],
                        },
                    ];
                    if (Boolean(dep?.title?.trim()) && depWiz)
                        OR.push({
                            OR: [
                                {
                                    product: {
                                        name: dep?.title,
                                        category: depWiz?.category,
                                    },
                                },
                                { parentId: null },
                            ],
                        });
                    where.OR = OR;
                    inventory = await prisma.orderInventory.findFirst({
                        where,
                        // include: {
                        // product: true
                        // },
                    });
                    if (depWiz && inventory?.product) {
                        if (dep?.title && inventory.product.name != dep.title) {
                            inventory = null;
                        }
                    }
                    if (inventory) {
                        if (inventory.price != comp?.price && comp.price > 0) {
                            await prisma.orderInventory.update({
                                where: {
                                    id: inventory.id,
                                },
                                data: {
                                    parentId: parentIds[depWiz?.uuid] ?? null,
                                    price: convertToNumber(comp.price),
                                },
                            });
                        }
                    }
                    if (!inventory) {
                        inventory = await prisma.orderInventory.create({
                            data: {
                                parentId: parentIds[depWiz?.uuid] ?? null,
                                price: convertToNumber(comp.price),
                                name: comp.title,
                                category: wiz.category,
                                createdAt: new Date(),
                            },
                        });
                    }
                    parentIds[wiz.uuid] = inventory.id;
                    (args as any)[wiz.uuid].productId = inventory.id;
                    if (depWiz && !inventory.parentId) {
                        const findParentId = parentIds[depWiz.uuid];
                        if (findParentId)
                            await prisma.orderInventory.update({
                                where: {
                                    id: inventory.id,
                                },
                                data: {
                                    parentId: findParentId,
                                },
                            });
                        else {
                            expectingParent[depWiz.uuid] = inventory.id;
                        }
                    }
                }
            })
    );

    await Promise.all(
        Object.entries(expectingParent).map(async ([k, v]) => {
            const parentId = parentIds[k];
            if (parentId > 0)
                await prisma.orderInventory.update({
                    where: {
                        id: v as any,
                    },
                    data: {
                        parentId: parentId,
                    },
                });
        })
    );
    return args;
}
