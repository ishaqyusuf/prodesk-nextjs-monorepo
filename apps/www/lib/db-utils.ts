import { getPageInfo, queryFilter } from "@/app/(v1)/_actions/action-utils";

export function _searchQuery<T>(query, ...columns: (keyof T)[]) {
    if (!query._q) return {};
    const q = {
        contains: query._q || undefined,
    };
    console.log(q);

    const OR: any = [];
    columns.map((c) => {
        OR.push({
            [c]: q,
        });
    });

    return {
        OR,
    };
}
export async function queryBuilder<T>(query, table, soft = true) {
    const where = whereQuery<T>(query, soft);
    const queryFilters = await queryFilter(query);
    return {
        ...where,
        getWhere: where.get,
        queryFilters,
        _prismaArgs() {
            return {
                where: where.get(),
                ...queryFilters,
            };
        },
        pagePageInfo: async () => await getPageInfo(query, where.get(), table),
        async response(data) {
            const pageInfo = await getPageInfo(query, where.get(), table);
            return {
                pageInfo,
                data,
            };
        },
    };
}
export function whereQuery<T>(query, soft = true) {
    let where: any = {} as any;
    if (soft) where.deletedAt = null;
    const q = {
        contains: query._q || undefined,
    } as any;
    console.log(q);

    return {
        where,
        get: () => where as any,
        register(column: keyof T, value: any) {
            where[column] = value;
        },
        orWhere(column: keyof T, value: any) {
            if (value) this.register(column, value || undefined);
        },
        searchRelationQuery: <T1>(...columns: (keyof T)[]) => {
            Object.entries(_searchQuery<T>(query, ...columns)).map(
                ([k, v]) => (where[k] = v)
            );
        },
        q,
        raw(rq: T) {
            where = {
                ...where,
                ...rq,
            };
            // Object.entries(rq as any).map(([k, v]) => (where[k] = v));
        },
        search(_search: T) {
            if (q.contains) {
                if (!where.OR) where.OR = [];
                Object.entries(_search as any).map(([k, v]) => {
                    where.OR.push({
                        [k]: v,
                    });
                });
            }
        },
        searchQuery: (...columns: (keyof T)[]) => {
            Object.entries(_searchQuery<T>(query, ...columns)).map(
                ([k, v]) => (where[k] = v)
            );
        },
    };
}
// export function
