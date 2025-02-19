"use client";

import { MiddaySearchFilter } from "@/components/midday-search-filter/search-filter";
import { useQueryStates } from "nuqs";

interface Props {}
const defaultSearch = {};
export function SalesAccountingSearchFilter({}: Props) {
    const [filters, setFilters] = useQueryStates({});

    return (
        <MiddaySearchFilter
            defaultSearch={defaultSearch}
            filters={filters}
            setFilters={setFilters}
        />
    );
}
