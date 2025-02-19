"use client";

import { DateCellContent } from "@/components/_v1/columns/base-columns";
import StatusBadge from "@/components/_v1/status-badge";
import {
    Menu,
    MenuItem,
} from "@/components/_v1/data-table/data-table-row-actions";
import { updateDeliveryModeDac } from "@/app/(v2)/(loggedIn)/sales/_data-access/update-delivery-mode.dac";
import { toast } from "sonner";
import salesData from "@/app/(v2)/(loggedIn)/sales/sales-data";

export default function DeliveryCell({ item }: any) {
    const date =
        item.pickup?.pickupAt || item.pickup?.createdAt || item.deliveredAt;
    function Content() {
        return (
            <>
                <span className="capitalize">
                    <StatusBadge status={item.deliveryOption || "not set"} sm />
                    {date && <DateCellContent>{date}</DateCellContent>}
                </span>
            </>
        );
    }
    async function updateDeliveryMode(delivery) {
        if (delivery != item.deliveryOption) {
            await updateDeliveryModeDac(
                item.id,
                delivery,
                item.type == "order" ? "orders" : "quotes"
            );

            toast.success("Updated");
        }
    }
    if (date) return <Content />;

    return (
        <Menu
            Trigger={
                <button>
                    <Content />
                </button>
            }
        >
            {salesData.delivery.map((o) => (
                <MenuItem onClick={() => updateDeliveryMode(o.value)} key={o}>
                    {o.text}
                </MenuItem>
            ))}
        </Menu>
    );
}
