"use client";

import { ISalesOrder } from "@/types/sales";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { cn } from "@/lib/utils";
import { ICustomer } from "@/types/customers";
import { useAppSelector } from "@/store";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import {
    Cell,
    PrimaryCellContent,
    SecondaryCellContent,
} from "../columns/base-columns";
import { formatDate } from "@/lib/use-day";
import { OrderInvoiceCell } from "../../../app/(v1)/(loggedIn)/sales/orders/components/cells/sales-columns";
import { useDataPage } from "@/lib/data-page-context";
import { OrderRowAction } from "../actions/sales-menu-actions";

interface Props {
    className?;
}
export default function RecentSalesCard({ className }: Props) {
    const { data: customer } = useDataPage<ICustomer>();
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
            </CardHeader>
            <CardContent className="">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead>P.O</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customer?.salesOrders?.map((order, key) => (
                            <TableRow key={key}>
                                <TableCell className="p-1">
                                    <Cell
                                        row={order}
                                        link="/sales/order/slug"
                                        slug={order.orderId}
                                    >
                                        <PrimaryCellContent>
                                            {order.orderId}
                                        </PrimaryCellContent>
                                        <SecondaryCellContent>
                                            {formatDate(order.createdAt)}
                                        </SecondaryCellContent>
                                    </Cell>
                                </TableCell>
                                <TableCell className="p-1">
                                    <div>
                                        <OrderInvoiceCell order={order} />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>{order.meta?.po}</div>
                                </TableCell>
                                <OrderRowAction row={order} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
