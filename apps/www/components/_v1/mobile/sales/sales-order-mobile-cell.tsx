"use client";

import { ISalesOrder } from "@/types/sales";
import {
    DateCellContent,
    PrimaryCellContent,
    SecondaryCellContent,
} from "../../columns/base-columns";
import {
    OrderInvoiceCell,
    OrderStatus,
} from "../../../../app/(v1)/(loggedIn)/sales/orders/components/cells/sales-columns";
import MobileMenuBtn from "../mobile-menu-btn";

export default function SalesOrderMobileCell({
    order,
}: {
    order: ISalesOrder;
}) {
    return (
        <div className="my-2 space-y-2 p-2 overflow-hidden shadow border rounded-lg">
            <div className="flex justify-between">
                <PrimaryCellContent>{order.orderId}</PrimaryCellContent>
                <OrderStatus order={order} />
            </div>
            <div className="">
                <div className="flex justify-between">
                    <PrimaryCellContent>
                        {order?.customer?.businessName || order?.customer?.name}
                    </PrimaryCellContent>
                    <SecondaryCellContent>
                        {order?.shippingAddress?.phoneNo ||
                            order?.billingAddress?.phone}
                    </SecondaryCellContent>
                </div>
                <SecondaryCellContent>
                    {order?.shippingAddress?.address1}
                </SecondaryCellContent>
            </div>
            <div className="flex justify-end">
                <OrderInvoiceCell className="flex space-x-1" order={order} />
            </div>
            <div className="border-t flex pt-1 justify-between">
                <DateCellContent>{order.createdAt}</DateCellContent>
                <MobileMenuBtn data={order} />
            </div>
        </div>
    );
}
