import { getSalesOrder } from "@/app/(v1)/(loggedIn)/sales/_actions/sales";

import { queryParams } from "@/app/(v1)/_actions/action-utils";
import OrderPrinter from "@/components/_v1/print/order/order-printer";
import { Metadata } from "next";
import PageHeader from "@/components/_v1/page-header";
import { Breadcrumbs } from "@/components/_v1/breadcrumbs";
import { BreadLink } from "@/components/_v1/breadcrumbs/links";
import SalesTabLayout from "@/components/_v1/tab-layouts/sales-tab-layout";
import { _restoreSalesOrder } from "@/app/(v1)/_actions/fix/restore-sales-order";
import { _mergeConflictCustomers } from "@/app/(v1)/_actions/fix/merge-conflict-customer";

import NewSalesBtn from "./components/new-sales-btn";
import CopyFn from "./components/copy-fn";
import OrdersTable from "./components/orders-table";
import AuthGuard from "@/app/(v2)/(loggedIn)/_components/auth-guard";
import dayjs from "dayjs";
import Portal from "@/components/_v1/portal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NewFeatureBtn from "@/components/common/new-feature-btn";

export const metadata: Metadata = {
    title: "Sales Orders",
};
interface Props {}
export default async function SalesOrdersPage({ searchParams }) {
    // if (env.NODE_ENV == "production") redirect("/sales/dashboard/orders");
    // if (dayjs().get("minutes") > 10) throw new Error("paystack error");
    const response = getSalesOrder({
        ...queryParams(searchParams),
        _noBackOrder: true,
        isDyke: false,
    });

    return (
        <AuthGuard can={["viewOrders"]}>
            {/* <RestoreOrders /> */}
            <SalesTabLayout query={searchParams}>
                <Breadcrumbs>
                    <BreadLink isFirst title="Sales" />
                    <BreadLink isLast title="Orders" />
                </Breadcrumbs>
                <Portal nodeId={"actionNav"}>
                    <div>
                        <NewFeatureBtn href="/sales-book/orders">
                            New Site
                        </NewFeatureBtn>
                    </div>
                </Portal>
                <CopyFn />
                <OrdersTable searchParams={searchParams} promise={response} />
                <OrderPrinter />
            </SalesTabLayout>
        </AuthGuard>
    );
}
