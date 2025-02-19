"use client";

import { IAddressBook, ISalesOrder } from "@/types/sales";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "../../../../../../../components/_v1/info";
import { AddressBooks } from "@prisma/client";
import OrderOverviewActions from "../../../../../../../components/_v1/actions/order-overview-actions";
import { convertToNumber } from "@/lib/use-number";
import { useDataPage } from "@/lib/data-page-context";
import { SalesCells } from "../../../orders/components/cells";

interface Props {
    isProd?: Boolean;
}
export default function SalesEmailSection({}: Props) {
    const { data: order } = useDataPage<ISalesOrder>();
    const isProd = order?.ctx?.prodPage;
    return (
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="inline-flex items-center space-x-2">
                            <span>Order Information</span>
                            <SalesCells.Flag item={order} />
                        </div>
                        {isProd ? <></> : <OrderOverviewActions />}
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
                    <Info label="Order ID">{order.orderId}</Info>
                    <Info label="Production (Due)">
                        {order.prodStatus} (
                        {(order.prodDueDate || "-") as string})
                    </Info>
                    <Info label={"P.O No."} value={order.meta.po}></Info>
                    <Info hidden={isProd} label="Invoice (Paid)">
                        <span>
                            <span className="font-medium">
                                {" "}
                                ${order.grandTotal}
                            </span>{" "}
                            ($
                            {convertToNumber(
                                (order.grandTotal || 0) - (order.amountDue || 0)
                            )}
                            )
                        </span>
                    </Info>
                    <Info label="Order Date">
                        <span>{order.createdAt as any}</span>
                    </Info>
                    <Info label="Sales Rep">
                        <span>{order.salesRep?.name}</span>
                    </Info>
                    <Info label="Production">
                        <span>{order.producer?.name || "Not Assigned"}</span>
                    </Info>
                    {!isProd && (
                        <>
                            <AddressInfo
                                label="Bill To"
                                address={order.billingAddress}
                            />
                            <AddressInfo
                                label="Ship To"
                                address={order.billingAddress}
                            />
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
function AddressInfo({
    address,
    label,
}: {
    address: IAddressBook | undefined;
    label;
}) {
    if (!address) return <Info label={label}>Not Specified</Info>;
    return (
        <Info label={label}>
            <span>{address?.name}</span>
            <span>{address?.phoneNo}</span>
            <span>{address?.address1}</span>
            <span>
                {address?.city}
                {address?.state} {address?.meta?.zip_code}
            </span>
        </Info>
    );
}
