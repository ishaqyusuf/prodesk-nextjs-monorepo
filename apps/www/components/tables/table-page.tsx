import { getQueryClient } from "@/providers/get-query-client";
import {
    composeFilter,
    QueryKeys,
} from "../(clean-code)/data-table/filter-command/filters";
import { searchParamsCache } from "../(clean-code)/data-table/search-params";
import { dataOptions } from "../(clean-code)/data-table/query-options";

export default async function TablePage({
    searchParams,
    filterKey,
    PageClient,
}: {
    PageClient;
    searchParams;
    filterKey: QueryKeys;
}) {
    const search = searchParamsCache.parse(searchParams);
    const queryClient = getQueryClient();
    const props = composeFilter(
        // "production-tasks"
        filterKey
        // await getSalesPageQueryDataDta()
    );
    const { queryKey, filterFields } = props;
    await queryClient.prefetchInfiniteQuery(dataOptions(search, queryKey));
    return <PageClient queryKey={queryKey} filterFields={filterFields} />;
}
