"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useDataPage } from "@/lib/data-page-context";
import { SalesOverviewType } from "../overview-shell";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalesOverviewDykeInvoiceTab } from "./dyke-doors-sales-overview-tab";
import { Badge } from "@/components/ui/badge";
import { ShelfItemsSalesOverviewTab } from "./shelf-items-sales-overview-tab";

export default function OverviewTabs() {
    const { data } = useDataPage<SalesOverviewType>();

    const defaultValue = data.isDyke
        ? data.totalDoors
            ? "dyke-doors"
            : "shelf-items"
        : "invoice";

    return (
        <Card>
            {/* <CardHeader></CardHeader> */}
            <CardContent className="mt-6">
                <Tabs defaultValue={defaultValue}>
                    <TabsList className="w-full justify-start">
                        {data.isDyke ? (
                            <>
                                <TabsTrigger
                                    disabled={data.totalDoors == 0}
                                    value={"dyke-doors"}
                                >
                                    Doors
                                    <Badge
                                        className="mx-2"
                                        variant={"secondary"}
                                    >
                                        {data.totalDoors}
                                    </Badge>
                                </TabsTrigger>
                                <TabsTrigger
                                    disabled={data.shelfItems.length == 0}
                                    value={"invoice"}
                                >
                                    Shelf Items{" "}
                                    <Badge
                                        className="mx-2"
                                        variant={"secondary"}
                                    >
                                        {data.shelfItems.length}
                                    </Badge>
                                </TabsTrigger>
                            </>
                        ) : (
                            <TabsTrigger value={"invoice"}>
                                {"Invoice Lines"}
                            </TabsTrigger>
                        )}
                        <TabsTrigger value="production">
                            Production Items
                        </TabsTrigger>
                    </TabsList>
                    <SalesOverviewDykeInvoiceTab />
                    <ShelfItemsSalesOverviewTab />
                </Tabs>
            </CardContent>
        </Card>
    );
}
