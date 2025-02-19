"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import TabbedLayout from "@/components/_v1/tab-layouts/tabbed-layout";

export default function CommissionsLayout({
    children,
    query,
}: {
    children;
    query?;
}) {
    const { data: session } = useSession({
        required: false,
    });
    const can = session?.can;
    // useEffect(() =>)
    const [tabs, setTabs] = useState(
        [
            can?.viewOrders && { title: "Orders", path: "/sales/orders" },
            // can?.viewOrders && {
            //     title: "Back Orders",
            //     path: "/sales/back-orders",
            // },
            can?.viewOrders && { title: "Estimates", path: "/sales/quotes" },
            can?.viewInboundOrder && {
                title: "Inbounds",
                path: "/sales/inbounds",
            },
            can?.viewDelivery && { title: "Delivery", path: "/sales/delivery" },
            can?.viewDelivery && { title: "Pickup", path: "/sales/pickup" },
        ].filter(Boolean)
    );
    return <TabbedLayout tabs={tabs as any}>{children}</TabbedLayout>;
}
