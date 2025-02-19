import { SiteLinksPage } from "@/app/(clean-code)/_common/query-tab/links";
import { userId } from "@/app/(v1)/_actions/utils";
import { prisma } from "@/db";
import { Prisma } from "@/db";

export async function loadQueryTabsDta(page?) {
    const id = await userId();
    const tabs = await prisma.pageTabs.findMany({
        where: {
            page: page ? page : undefined,
            OR: [
                {
                    AND: [{ private: true }, { userId: id }],
                },

                { private: false },
            ],
        },
        include: {
            tabIndices: {
                where: {
                    userId: id,
                },
            },
        },
    });
    return tabs.map((tab) => {
        const { tabIndices } = tab;
        let tabIndex = tabIndices[0];
        if (!tabIndex)
            tabIndex = {
                userId: id,
            } as any;
        return {
            ...tab,
            page: tab.page as SiteLinksPage,
            tabIndex,
        };
    });
}
export async function updateQueryDataDta(id, data: Prisma.PageTabsUpdateInput) {
    return await prisma.pageTabs.update({
        where: { id },
        data,
    });
}
export async function saveQueryDta(data: Prisma.PageTabsCreateInput) {
    const resp = await prisma.pageTabs.create({
        data,
    });

    return resp;
}
export async function updateTabIndex(id, data: Prisma.PageTabIndexUpdateInput) {
    return await prisma.pageTabIndex.update({
        where: { id },
        data,
    });
}
export async function createTabIndexDta(data: Prisma.PageTabIndexCreateInput) {
    return await prisma.pageTabIndex.create({
        data,
    });
}
