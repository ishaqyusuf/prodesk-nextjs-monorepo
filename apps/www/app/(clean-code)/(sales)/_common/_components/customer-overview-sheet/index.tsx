import Modal from "@/components/common/modal";
import { useEffect } from "react";
import { customerStore } from "./store";
import { getCustomerOverviewUseCase } from "../../use-case/customer-use-case";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import SalesTab from "./sales-tab";
import QuotesTab from "./quotes-tab";
import PaymentsTab from "./payments-tab";
import { _modal } from "@/components/common/modal/provider";

export const openCustomerOverviewSheet = (phoneNo) =>
    _modal.openSheet(<CustomerOverviewSheet phoneNo={phoneNo} />);
export default function CustomerOverviewSheet({ phoneNo }) {
    const store = customerStore();

    useEffect(() => {
        store.clear();
        getCustomerOverviewUseCase(phoneNo).then((resp) => {
            store.initialize(resp);
        });
    }, []);
    return (
        <Modal.Content>
            {store.loading ? (
                <></>
            ) : (
                <>
                    <Modal.Header
                        title={store.profile.displayName?.toUpperCase()}
                        subtitle={store.profile.phoneNo}
                    />
                    <Tabs value={store.tab} onValueChange={store.tabChanged}>
                        <TabsList className="w-full">
                            <TabsTrigger className="space-x-2" value="sales">
                                <span>Sales</span>
                                <Badge
                                    variant={
                                        store.tab == "sales"
                                            ? "default"
                                            : "outline"
                                    }
                                >
                                    {store.salesInfo?.orders?.length}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger className="space-x-2" value="quotes">
                                <span>Quotes</span>
                                <Badge
                                    variant={
                                        store.tab == "quotes"
                                            ? "default"
                                            : "outline"
                                    }
                                    className=""
                                >
                                    {store.salesInfo?.quotes?.length}
                                </Badge>
                            </TabsTrigger>
                            <TabsTrigger className="space-x-2" value="payments">
                                <span>Payments</span>
                            </TabsTrigger>
                        </TabsList>
                        <ScrollArea className="h-[80vh]">
                            <SalesTab />
                            <QuotesTab />
                            <PaymentsTab />
                        </ScrollArea>
                    </Tabs>
                </>
            )}
        </Modal.Content>
    );
}
