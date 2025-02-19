"use client";

import { DykeShelfProducts } from "@prisma/client";
import { prods } from "./products";
import categoryUtils from "./category-utils";
import { useEffect } from "react";
import { createDykeProducts } from "./_dyke-action";

export default function DykePage() {
    useEffect(() => {
        let products: DykeShelfProducts[] = [];
        prods._prods.map((productGroup) => {
            const cat = categoryUtils.generate(productGroup?.cats);
            // console.log(categoryUtils.categories.length);
            productGroup?.products?.map((product) => {
                products.push({
                    ...product,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    parentCategoryId: cat.parentCategoryId,
                    categoryId: cat.categoryId,
                    meta: {
                        categoryIds: [cat.categories.map((c) => c.id)],
                    },
                } as any);
            });
        });
        (async () => {
            await createDykeProducts(products, categoryUtils.categories);
        })();
    }, []);
    // console.log(products.length);

    return <></>;
}
