import { QueryTabs } from "@/use-cases/query-tab-use-case";
import { create } from "zustand";
import { siteLinks, SiteLinksPage } from "./links";
import { isEqual } from "lodash";
import QueryString from "qs";
import { dotSet } from "../utils/utils";

type State = {
    allTabs: QueryTabs;
    pageInfo?: {
        page: SiteLinksPage;
        links: QueryTabs;
        rootPath: string;
        query;
        currentTabIndex;
    };
    currentPageQuery;
};
type Action = {
    update(key: keyof IQueryTabStore, data);
    initPage(page: SiteLinksPage, query);
    updateQuery(query);
};

export type IQueryTabStore = State & Action;
export const useQueryTabStore = create<IQueryTabStore>((set) => ({
    allTabs: [],
    pageTabs: [],
    updateQuery(query) {
        set((state) => {
            const newState = { ...state };
            const dot = dotSet(newState);
            const currentTab = newState.pageInfo?.links?.find((s) =>
                isEqual(QueryString.parse(s.query), query)
            );
            if (currentTab) {
                dot.set("pageInfo.query", null);
                dot.set("pageInfo.currentTabIndex", currentTab.tabIndex);
            } else {
                dot.set("pageInfo.query", query);
            }
            return newState;
        });
    },
    initPage(page, query) {
        set((state) => {
            if (state.pageInfo?.page == page)
                return {
                    ...state,
                    pageInfo: {
                        ...state.pageInfo,
                    },
                };
            const links = state.allTabs
                ?.filter((d) => d.page == page)
                .sort((a, b) => a.tabIndex?.tabIndex - b.tabIndex?.tabIndex);
            const currentTab = links?.find((s) =>
                isEqual(QueryString.parse(s.query), query)
            );
            return {
                ...state,
                pageInfo: {
                    page,
                    links,
                    rootPath: siteLinks[page],
                    query: currentTab ? null : query,
                    currentTabIndex: currentTab?.tabIndex,
                },
            };
        });
    },
    currentPageQuery: null,
    update(key, data) {
        set((state) => ({
            ...state,
            [key]: data,
        }));
    },
}));
