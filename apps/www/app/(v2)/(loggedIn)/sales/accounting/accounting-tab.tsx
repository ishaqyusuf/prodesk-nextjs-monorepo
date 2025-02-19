"use client";

import { useTab } from "@/_v2/components/tab-layout/tab-hook";
import TabbedLayout from "@/components/_v1/tab-layouts/tabbed-layout";
import { useEffect } from "react";

export default function AccountingTab() {
    const tab = useTab();
    useEffect(() => {
        // tab.registerTab(
        //     "Accounting",
        //     "/sales/accounting",
        //     ({ viewOrderPayment }) => viewOrderPayment
        // );
        tab.reset();
        tab.registerTab(
            "Payments",
            "/sales/accounting",
            tab.can("viewOrderPayment")
        );
        tab.registerTab(
            "Payables",
            "/sales/accounting/payables",
            tab.can("viewOrderPayment")
        );
    }, []);
    return <TabbedLayout tabs={tab.tabs} />;
}
