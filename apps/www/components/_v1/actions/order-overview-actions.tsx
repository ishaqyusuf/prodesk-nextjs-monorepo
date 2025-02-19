"use client";

import Link from "next/link";
import { Pencil } from "lucide-react";
import { OrderRowAction } from "./sales-menu-actions";
import { ISalesOrder } from "@/types/sales";
import { useAppSelector } from "@/store";
import UpdateSalesDate from "../sales/update-sales-date";
import { useDataPage } from "@/lib/data-page-context";
import { useAssignment } from "@/app/(v2)/(loggedIn)/sales-v2/productions/_components/_modals/assignment-modal/use-assignment";
import Button from "@/components/common/button";
import { restoreSalesDac } from "@/app/(v2)/(loggedIn)/sales/_data-access/sales.restore.dac";
import { _revalidate } from "@/app/(v1)/_actions/_revalidate";

interface Props {
    estimate?: Boolean;
}
export default function OrderOverviewActions({ estimate }: Props) {
    const { data: order } = useDataPage<ISalesOrder>();
    // const _linkDir = `/sales/${order?.type || "order"}/${order.orderId}/form`;
    const _linkDir = order.isDyke
        ? `/sales-book/edit-${order.type}/${order.slug}`
        : `/sales/edit/${order.type}/${order.slug}`;
    const prod = useAssignment();
    async function _restore() {
        await restoreSalesDac(order.id);
        await _revalidate("salesOverview");
    }
    return (
        <div className="flex space-x-2">
            {/* <UpdateSalesDate sales={order} /> */}
            {order.deletedAt && (
                <Button variant="destructive" size="sm" action={_restore}>
                    Restore
                </Button>
            )}
            {order.isDyke && (
                <Button
                    onClick={() => {
                        prod.open(order.id);
                    }}
                    size="sm"
                >
                    Production
                </Button>
            )}
            <Link className="hidden sm:block" href={_linkDir}>
                <Button className="h-8 w-8 p-0" variant="outline">
                    <Pencil className="h-4 w-4" />
                </Button>
            </Link>
            <OrderRowAction row={order} estimate={estimate} viewMode />
        </div>
    );
}
