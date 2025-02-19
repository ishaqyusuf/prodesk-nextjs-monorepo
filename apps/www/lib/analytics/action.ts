"use server";

import { userId } from "@/app/(v1)/_actions/utils";
import { prisma } from "@/db";

export async function registerPageAnayltic(url, searchParams) {
    return;
    const authId = await userId();

    await prisma.pageView.create({
        data: {
            userId: authId,
            url,
            group: getGroup(url),
            searchParams,
        },
    });
}

const groups = {
    // "sales-quotes": "/sales/quotes",
    // "slaes-orders": "/sales/orders",
};
function getGroup(url) {
    let group = url?.split("?")[0]?.split("/").filter(Boolean).join("-");
    if (!group) group = "home";
    Object.entries(groups).map(([k, v]) => {
        if (url.startsWith(v)) group = k;
    });
    return group;
}
