import { AsyncFnType } from "@/app/(clean-code)/type";
import { prisma } from "@/db";
import { Prisma } from "@/db";
import { StepComponentForm, StepComponentMeta } from "../../types";
import { generateRandomString } from "@/lib/utils";

export interface LoadStepComponentsProps {
    stepId?: number;
    stepTitle?: "Door" | "Moulding";
    id?;
    ids?;
    title?;
    isCustom?: boolean;
}
export async function loadStepComponentsDta(props: LoadStepComponentsProps) {
    const prods = await getComponentsDta(props);
    const resp = prods
        // .filter((p) => p.product || p.door)
        .map(transformStepProduct);
    const filtered = resp.filter(
        (r, i) => resp.findIndex((s) => s.title == r.title) == i,
    );
    console.log(filtered.length);
    return filtered;
    // if (resp.filter((s) => s.sortIndex >= 0).length)
    //     return resp.sort((a, b) => a.sortIndex - b.sortIndex);
    console.log(resp);

    return resp;
}
export async function getSaleRootComponentConfigDta(ids) {}
export async function getComponentsDta(props: LoadStepComponentsProps) {
    const wheres: Prisma.DykeStepProductsWhereInput[] = [];

    if (props.stepTitle == "Door")
        wheres.push({
            OR: [
                { door: { isNot: null }, deletedAt: {} },
                { dykeStepId: props.stepId },
            ],
        });
    else if (props.stepTitle == "Moulding") {
        wheres.push({
            OR: [
                {
                    product: {
                        category: {
                            title: props.stepTitle,
                        },
                    },
                },
                { dykeStepId: props.stepId },
            ],
        });
    } else {
        if (props.stepId)
            wheres.push({
                dykeStepId: props.stepId,
            });
    }
    if (props.isCustom) wheres.push({ custom: true });
    if (props.title)
        wheres.push({
            name: props.title,
        });
    if (props.id) wheres.push({ id: props.id });
    if (props.ids)
        wheres.push({
            id: {
                in: props.ids,
            },
        });
    const stepProducts = await prisma.dykeStepProducts.findMany({
        where:
            wheres.length == 0
                ? wheres[0]
                : {
                      AND: wheres,
                  },
        include: {
            door: props.stepTitle != null,
            product: true,
        },
    });
    // .sort((a, b) => {
    //     if (!a.img || !a.product?.img || !a.door?.img) return -1; // `a` has no image, move it later
    //     if (!b.img || !b.product?.img || !b.door?.img) return -1; // `b` has no image, move it later
    //     return 0; // Both have images, keep order
    // });
    // if (props.stepId) {
    //     console.log(stepProducts.length);
    //     // const filtered = stepProducts.filter((_, i) =>
    //     //     _.name
    //     //         ? true
    //     //         : stepProducts.findIndex(
    //     //               (p) => p.dykeProductId == _.dykeProductId
    //     //           ) == i
    //     // );
    //     console.log(stepProducts.length);
    //     return stepProducts;
    // }
    return stepProducts.map((s) => ({
        ...s,
        meta: s.meta as any as StepComponentMeta,
    }));
}

export function transformStepProduct(
    component: AsyncFnType<typeof getComponentsDta>[number],
) {
    const { door, product, ...prod } = component;
    let meta: StepComponentMeta = prod.meta as any;
    if (!prod.meta)
        meta = {
            stepSequence: [],
            deleted: {},
            show: {},
        };
    // let prodMeta: DykeProductMeta = product?.meta || door?.meta || ({} as any);
    // if (door)
    //     prodMeta = {
    //         // ...findDoorSvg(prod.door.title, prod.door.img),
    //         ...prodMeta,
    //     };
    return {
        uid: component.uid,
        id: component.id,
        title: prod.name || door?.title || product?.title,
        img: prod.img || product?.img || door?.img,
        productId: product?.id || door?.id,
        variations: meta?.variations || [],
        sectionOverride: meta?.sectionOverride,
        salesPrice: null,
        basePrice: null,
        stepId: component.dykeStepId,
        productCode: component.productCode,
        redirectUid: component.redirectUid,
        _metaData: {
            custom: component.custom,
            visible: false,
            priceId: null,
        },
    };
}
export type GetStepComponent = ReturnType<typeof transformStepProduct>;
export async function updateStepComponentDta(id, data) {
    return await prisma.dykeStepProducts.update({
        where: { id },
        data: {
            ...data,
        },
    });
}
export async function createStepComponentDta(data: StepComponentForm) {
    const meta = {} satisfies StepComponentMeta;
    const c = data.id
        ? await prisma.dykeStepProducts?.update({
              where: { id: data.id },
              data: {
                  img: data.img,
                  name: data.title,
                  productCode: data.productCode,
              },
          })
        : prisma.dykeStepProducts.create({
              data: {
                  uid: generateRandomString(5),
                  custom: data.custom,
                  productCode: data.productCode,
                  meta,
                  step: {
                      connect: { id: data.stepId },
                  },
                  img: data.img,
                  name: data.title,
              },
          });
    return c;
}
