import { dateQuery } from "@/app/(v1)/_actions/action-utils";
import { Prisma } from "@/db";

export function wherePayableSalesOrders(query) {
    const whereDate = dateQuery({
        ...query,
        _dateType: "goodUntil",
    });
    const where: Prisma.SalesOrdersWhereInput = {
        amountDue: {
            gt: 0,
        },
        ...whereDate,
    };
    if (query._q) {
        //
        let numSearch = query._q?.split(" ")?.filter(Boolean).join("");
        [">", ">=", "<", "<=", "="].map(
            (s) => (numSearch = numSearch?.replace(s, "")),
        );
        numSearch = Number(numSearch);
        if (numSearch >= 0) {
            let numS = "equals";

            if (query._q?.startsWith(">")) numS = "gt";
            where.amountDue = {
                [numS]: numSearch,
            };
        } else {
            const _query = { contains: query._q };
            where.OR = [
                {
                    orderId: _query,
                },
                {
                    customer: {
                        OR: [{ businessName: _query }, { name: _query }],
                    },
                },
            ];
        }
    }
    return where;
}
