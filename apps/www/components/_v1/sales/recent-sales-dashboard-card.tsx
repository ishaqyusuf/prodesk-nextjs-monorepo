"use client";

import { ISalesOrder } from "@/types/sales";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { cn } from "@/lib/utils";
import { ICustomer } from "@/types/customers";
import { useAppSelector } from "@/store";
import { Table, TableBody, TableCell, TableRow } from "../../ui/table";
import {
    Cell,
    PrimaryCellContent,
    SecondaryCellContent,
} from "../columns/base-columns";
import { formatDate } from "@/lib/use-day";
import { OrderInvoiceCell } from "../../../app/(v1)/(loggedIn)/sales/orders/components/cells/sales-columns";
import { ISalesDashboard } from "@/types/dashboard";
import Link from "next/link";
import { Button } from "../../ui/button";
import { useDataPage } from "@/lib/data-page-context";

interface Props {
    className?;
}
export default function RecentSalesDashboardCard({ className }: Props) {
    const { data: db } = useDataPage<ISalesDashboard>();
    return (
        <Card className={cn(className)}>
            <CardHeader className="">
                <div className="flex justify-between items-center">
                    <CardTitle>Recent Sales</CardTitle>
                    <Button asChild variant="link">
                        <Link href="/sales/orders" className="text-sm">
                            All Sales
                        </Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="">
                <Table>
                    <TableBody>
                        {db?.recentSales?.map((order, key) => (
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
                                    <Cell
                                        row={order}
                                        link="/sales/customer/slug"
                                        slug={order?.customerId}
                                    >
                                        <PrimaryCellContent>
                                            {order?.customer?.name}
                                        </PrimaryCellContent>
                                        <SecondaryCellContent>
                                            {order?.customer?.phoneNo}
                                        </SecondaryCellContent>
                                    </Cell>
                                </TableCell>
                                <TableCell align="right" className="p-1">
                                    <div>
                                        <OrderInvoiceCell order={order} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
