import {
    SearchParamsType,
    searchParamsCache,
} from "@/components/(clean-code)/data-table/search-params";

import FPage from "@/components/(clean-code)/fikr-ui/f-page";
import { __isProd } from "@/lib/is-prod-server";
import { getQueryClient } from "@/providers/get-query-client";
import { dataOptions } from "@/components/(clean-code)/data-table/query-options";

import { composeFilter } from "@/components/(clean-code)/data-table/filter-command/filters";
import { constructMetadata } from "@/lib/(clean-code)/construct-metadata";
import { generateRandomString } from "@/lib/utils";
import Portal from "@/components/_v1/portal";
import NewFeatureBtn from "@/components/common/new-feature-btn";
import { prisma } from "@/db";
import ProductionTasksPageClient from "../_components/production-tasks-page-client";
import AuthGuard from "@/app/(v2)/(loggedIn)/_components/auth-guard";
import { authId } from "@/app/(v1)/_actions/utils";

export async function generateMetadata({}) {
    return constructMetadata({
        title: `Sales Production - gndprodesk.com`,
    });
}
export default async function SalesBookPage({ searchParams }) {
    const search = searchParamsCache.parse(searchParams);
    const queryClient = getQueryClient();
    const props = composeFilter(
        "production-tasks"
        // await getSalesPageQueryDataDta()
    );
    const { queryKey, filterFields } = props;
    await queryClient.prefetchInfiniteQuery(dataOptions(search, queryKey));
    return (
        <AuthGuard can={["viewProduction"]}>
            <FPage className="" title="Productions">
                <ProductionTasksPageClient
                    queryKey={queryKey}
                    filterFields={filterFields}
                />
            </FPage>
        </AuthGuard>
    );
}
