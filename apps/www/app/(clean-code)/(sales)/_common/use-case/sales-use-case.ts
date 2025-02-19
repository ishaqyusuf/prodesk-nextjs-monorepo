"use server";

import { __revalidatePath } from "@/app/(v1)/_actions/_revalidate";
import { deleteSalesDta, restoreDeleteDta } from "../data-access/sales-dta";

export async function deleteSalesUseCase(id) {
    const s = await deleteSalesDta(id);

    await __revalidatePath(`/sales-book/${s.type}s`);
}
export async function restoreDeleteUseCase(id) {
    const s = await restoreDeleteDta(id);
    await __revalidatePath(`/sales-book/${s.type}s`);
}
