"use server";

import { siteLinks } from "@/app/(clean-code)/_common/query-tab/links";
import { AsyncFnType } from "@/app/(clean-code)/type";
import { authId } from "@/app/(v1)/_actions/utils";
import {
    createTabIndexDta,
    loadQueryTabsDta,
    saveQueryDta,
    updateQueryDataDta,
} from "@/data-access/query-tab-dta";
import { Prisma } from "@/db";

export type QueryTabs = AsyncFnType<typeof loadQueryTabsUseCase>;
export async function loadQueryTabsUseCase() {
    const tabs = await loadQueryTabsDta();
    return tabs;
}
interface Props {
    tab: {
        data: Prisma.PageTabsUpdateInput;
        id?;
    };
    index: {
        data: Prisma.PageTabIndexUpdateInput;
        id?;
    };
}
export async function saveDataQueryUseCase({ tab: { data, id }, index }) {
    const userId = await authId();
    const tabsList = await loadQueryTabsDta(data.page);
    let nextIndex = tabsList.length;
    if (!tabsList.length) {
        const defaultPage = siteLinks[data.page as any];
        if (defaultPage) {
            const dp = await saveQueryDta({
                page: data.page as any,
                query: "",
                title: "All",
                userId,
            });
            await createTabIndexDta({
                default: true,
                tabIndex: nextIndex++,
                tab: {
                    connect: { id: dp.id },
                },
                userId: id,
            });
        }
    }
    if (id) {
        const q = await updateQueryDataDta(id, data);
    } else {
        // await saveQueryDta({
        //     page: data.page as any,
        //     query: data.query as any,
        //     title: data.title as any,
        //     // userId: await userId(),
        //     // default: data.default ? false : true,
        //     // tabIndex: nextIndex,
        //     private: data.private as any,
        // });
    }
}
