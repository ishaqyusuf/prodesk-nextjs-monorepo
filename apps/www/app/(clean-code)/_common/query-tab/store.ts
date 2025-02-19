import { QueryTabs } from "@/use-cases/query-tab-use-case";
import { create } from "zustand";
import { SiteLinksPage } from "./links";

const initialData = {
    tabList: [] as QueryTabs,
    page: {} as {
        links: QueryTabs;
        rootPath: any;
        linksCount: number;
    },
};
type Data = typeof initialData;
type Setter = (update: (state: Data) => Partial<Data>) => void;
function actions(set: Setter) {
    return {
        applyData: (data) => set((state) => ({ ...state, tabList: data })),
        initializePage(type: SiteLinksPage) {},
        // getDefaultPage: (page: SiteLinksPage,defautlLink) {
        // }
    };
}
type Zust = Data & ReturnType<typeof actions>;
export const useQueryStore = create<Zust>((set) => ({
    ...actions(set),
    ...initialData,
}));
