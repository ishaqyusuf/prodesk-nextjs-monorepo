import { searchParamsCache } from "@/components/(clean-code)/data-table/search-params";

import FPage from "@/components/(clean-code)/fikr-ui/f-page";
import { __isProd } from "@/lib/is-prod-server";
import { getQueryClient } from "@/providers/get-query-client";
import { dataOptions } from "@/components/(clean-code)/data-table/query-options";
import { composeFilter } from "@/components/(clean-code)/data-table/filter-command/filters";
import { constructMetadata } from "@/lib/(clean-code)/construct-metadata";
import Portal from "@/components/_v1/portal";
import NewFeatureBtn from "@/components/common/new-feature-btn";
import ProductionsPageClient from "../../_components/productions-page-client";

export async function generateMetadata({}) {
    return constructMetadata({
        title: `Sales Production - gndprodesk.com`,
    });
}
export default async function SalesBookPage({ searchParams }) {
    // const del = await prisma.salesStat.deleteMany({});
    // console.log(del);

    const search = searchParamsCache.parse(searchParams);
    const queryClient = getQueryClient();
    const props = composeFilter(
        "sales-productions"
        // await getSalesPageQueryDataDta()
    );
    const { queryKey, filterFields } = props;
    await queryClient.prefetchInfiniteQuery(dataOptions(search, queryKey));
    return (
        <FPage can={["viewOrders"]} className="" title="Productions">
            <Portal nodeId={"navRightSlot"}>
                <NewFeatureBtn href="/sales-v2/productions">
                    Old Site
                </NewFeatureBtn>
            </Portal>
            <ProductionsPageClient
                queryKey={queryKey}
                filterFields={filterFields}
            />
        </FPage>
    );
}
