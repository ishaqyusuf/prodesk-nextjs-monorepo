"use client";

import useEffectLoader from "@/lib/use-effect-loader";
import { salesOverviewStore } from "../store";
import { getSalesCustomerTxAction } from "@/actions/get-sales-customers-tx";
import Money from "@/components/_v1/money";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TCell } from "@/components/(clean-code)/data-table/table-cells";

export function TransactionHistoryTab() {
    const store = salesOverviewStore();
    const ctx = useEffectLoader(async () =>
        getSalesCustomerTxAction({
            "sales.id": store.salesId,
        })
    );
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Received By</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ctx.data?.data?.map((tx) => (
                        <TableRow key={tx.id}>
                            <TableCell>
                                <TCell.Date>{tx.createdAt}</TCell.Date>
                            </TableCell>
                            <TableCell>
                                <>{tx.author?.name}</>
                            </TableCell>
                            <TableCell>
                                <Money value={Math.abs(tx.amount)} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
