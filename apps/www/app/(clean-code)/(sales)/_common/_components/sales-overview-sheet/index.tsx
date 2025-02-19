import { _modal } from "@/components/common/modal/provider";
import { salesOverviewStore, SalesTabs, salesTabs } from "./store";
import Modal from "@/components/common/modal";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { SalesInfoTab } from "./tabs/sales-info-tab";
import { useSalesOverview } from "./hook";
import { Footer } from "./footer";
import { SalesItemsTab } from "./tabs/sales-items-tab";
import { SalesShippingForm } from "./tabs/sales-shipping-form";
import { SalesShippingTab } from "./tabs/sales-shipping-tab";
import { SalesShippingOverview } from "./tabs/sales-shipping-overview";
import { ProductionNoteTab } from "./tabs/prod-note-tab";
import { SalesNoteTab } from "./tabs/sales-note-tab";
import { TransactionHistoryTab } from "./tabs/transaction-history-tab";

interface OpenSalesOverviewProps {
    salesId;
    shippingId?;
}
export function openQuoteOVerview(props: OpenSalesOverviewProps) {
    salesOverviewStore.getState().reset({
        salesId: props.salesId,
        tabs: salesTabs.quotes,
        showTabs: true,
        // currentTab: "sales_info",
        showFooter: true,
        adminMode: true,
    });
    _modal.openSheet(<SalesOverviewModal />);
}
export function openSalesOverview(props: OpenSalesOverviewProps) {
    salesOverviewStore.getState().reset({
        salesId: props.salesId,
        tabs: salesTabs.admin,
        showTabs: true,
        // currentTab: "sales_info",
        showFooter: true,
        adminMode: true,
    });
    _modal.openSheet(<SalesOverviewModal />);
}
export function openSalesProductionModal(props: OpenSalesOverviewProps) {
    salesOverviewStore.getState().reset({
        salesId: props.salesId,
        tabs: salesTabs.admin,
        currentTab: "items",
        adminMode: true,
    });
    _modal.openSheet(<SalesOverviewModal />);
}
export function openDispatchModal(props: OpenSalesOverviewProps) {
    salesOverviewStore.getState().reset({
        salesId: props.salesId,
        tabs: salesTabs.admin,
        currentTab: "shipping_overview",
        shippingViewId: props.shippingId,
        adminMode: true,
        showTabs: true,
    });
    _modal.openSheet(<SalesOverviewModal />);
}
export function openSalesProductionTasksModal(props: OpenSalesOverviewProps) {
    salesOverviewStore.getState().reset({
        salesId: props.salesId,
        tabs: salesTabs.productionTasks,
        currentTab: "items",
        showTabs: true,
    });
    _modal.openSheet(<SalesOverviewModal />);
}

interface Props {}
export default function SalesOverviewModal({}: Props) {
    useSalesOverview();
    return (
        <Modal.MultiPane>
            <Modal.Pane>
                <PrimaryTab />
            </Modal.Pane>
        </Modal.MultiPane>
    );
    // return (
    //     <Modal.Content size="none" className="side-modal-rounded">
    //         <div className="flex-1 flex">
    //             {/* PRIMARY TAB */}
    //             <PrimaryTab />
    //             {/* <div className="w-[600px] flex flex-col side-modal-rounded-h-content">
    //                 <Modal.Header title="Title" />
    //                 <Modal.ScrollArea>
    //                     <div className="min-h-screen bg-red-50">abc</div>
    //                 </Modal.ScrollArea>
    //                 <Modal.Footer>
    //                     <div className="abc h-16 flex-1 bg-red-400">a</div>
    //                 </Modal.Footer>
    //             </div> */}
    //         </div>
    //     </Modal.Content>
    // );
}
function PrimaryTab({}) {
    const store = salesOverviewStore();
    // className = "w-[600px] flex flex-col side-modal-rounded-h-content";
    return (
        <>
            <Modal.Header
                title={
                    <span className="uppercase">
                        {store?.overview?.title || "Loading..."}
                    </span>
                }
                subtitle={store?.overview?.subtitle}
            />
            <Tabs
                value={store.currentTab}
                onValueChange={(e) => {
                    store.update("currentTab", e as any);
                }}
                className=""
            >
                <TabsList className={cn("w-full", !store.showTabs && "hidden")}>
                    {store.tabs?.map((tab) => (
                        <TabsTrigger
                            className={cn("uppercase", !tab.show && "hidden")}
                            key={tab.name}
                            value={tab.name}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            <div id="tabHeader"></div>
            <Modal.ScrollArea className="my-2">
                <TabContent tabName="sales_info">
                    <SalesInfoTab />
                </TabContent>
                <TabContent tabName="items">
                    <SalesItemsTab />
                </TabContent>
                <TabContent tabName="shipping">
                    <SalesShippingTab />
                </TabContent>
                <TabContent tabName="shipping_form">
                    <SalesShippingForm />
                </TabContent>
                <TabContent tabName="shipping_overview">
                    <SalesShippingOverview />
                </TabContent>
                <TabContent tabName="production_note">
                    <ProductionNoteTab />
                </TabContent>
                <TabContent tabName="notification">
                    <SalesNoteTab />
                </TabContent>
                <TabContent tabName="transactions">
                    <TransactionHistoryTab />
                </TabContent>
            </Modal.ScrollArea>
            {store.showFooter && (
                <Modal.Footer>
                    <Footer />
                </Modal.Footer>
            )}
        </>
    );
}

function TabContent({ children, tabName }: { children?; tabName: SalesTabs }) {
    const store = salesOverviewStore();
    return store.currentTab == tabName ? children : null;
}
function SecondaryTab({}) {
    return (
        <div className="sm:w-[600px] flex flex-col side-modal-rounded-h-content">
            <Modal.Header title="Title" subtitle={"LOREM IPSUM"} />
            <Modal.ScrollArea>
                <div className="min-h-screen">abc</div>
            </Modal.ScrollArea>
            <Modal.Footer>
                <div className="abc p-4 border-t flex-1">a</div>
            </Modal.Footer>
        </div>
    );
}
