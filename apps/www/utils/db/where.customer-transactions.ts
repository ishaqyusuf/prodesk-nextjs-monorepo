import { composeQuery } from "@/app/(clean-code)/(sales)/_common/utils/db-utils";
import { SearchParamsType } from "@/components/(clean-code)/data-table/search-params";
import { Prisma } from "@/db";

export function whereCustomerTx(query: SearchParamsType) {
    const whereAnd: Prisma.CustomerTransactionWhereInput[] = [
        // {
        //     salesPayments: {
        //         some: {
        //             order: {},
        //         },
        //     },
        // },
    ];
    if (query["sales.id"])
        whereAnd.push({
            salesPayments: {
                some: {
                    orderId: query["sales.id"],
                },
            },
        });
    return composeQuery(whereAnd);
}
