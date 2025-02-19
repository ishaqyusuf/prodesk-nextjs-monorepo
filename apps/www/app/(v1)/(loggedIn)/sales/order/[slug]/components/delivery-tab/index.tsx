"use client";

import { useDataPage } from "@/lib/data-page-context";
import { SalesOverview } from "../../type";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/_v1/icons";
import { useModal } from "@/components/common/modal/provider";
import CreateDeliveryModal from "../../_modal/create-delivery";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DateCellContent } from "@/components/_v1/columns/base-columns";

export default function DeliveryTabIndex() {
    const { data: order } = useDataPage<SalesOverview>();
    const modal = useModal();
    let deliveries = order.itemDeliveries.map((item) => {
        return {
            ...item,
            item: order.items.find((i) => i.id == item.orderItemId),
        };
    });
    return (
        <div>
            <Card className="">
                <CardHeader className="">
                    <div className="flex justify-between items-center">
                        <CardTitle className="">
                            <span>Deliveries</span>
                        </CardTitle>
                        <div>
                            <Button
                                onClick={() => {
                                    // modal.openModal(
                                    //     <CreateDeliveryModal order={order} />
                                    // );
                                }}
                                size={"sm"}
                            >
                                <Icons.add className="size-4 mr-4" />
                                <span>Create Delivery</span>
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                {deliveries?.length ? (
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead>Item</TableHead>
                                    <TableHead>Qty</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {deliveries.map((item) => {
                                    return (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <DateCellContent>
                                                    {item.createdAt}
                                                </DateCellContent>
                                            </TableCell>
                                            <TableCell>
                                                {item.item?.description}
                                            </TableCell>
                                            <TableCell>{item.qty}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                ) : (
                    <CardContent className="h-[40vh] flex flex-col justify-center text-muted-foreground items-center">
                        {/* <Icons. */}
                        <span>No Deliveries</span>
                    </CardContent>
                )}
            </Card>
        </div>
    );
}
