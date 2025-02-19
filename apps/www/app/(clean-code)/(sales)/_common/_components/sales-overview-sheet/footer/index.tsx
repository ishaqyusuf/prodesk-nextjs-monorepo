import ConfirmBtn from "@/components/_v1/confirm-btn";
import { salesOverviewStore } from "../store";
import { Icons } from "@/components/_v1/icons";
import {
    deleteSalesUseCase,
    restoreDeleteUseCase,
} from "../../../use-case/sales-use-case";
import { toast } from "sonner";
import { Menu } from "@/components/(clean-code)/menu";
import { PrintMenuAction } from "./print.menu.action";
import { MoveMenuAction } from "./move.menu.action";
import { CopyMenuAction } from "./copy.menu.action";
import { Button } from "@/components/ui/button";
import Money from "@/components/_v1/money";
import { openTxForm } from "../../tx-form";
import DevOnly from "@/_v2/components/common/dev-only";
import { resetSalesStatAction } from "../../../data-actions/sales-stat-control.action";
import { refreshTabData } from "../helper";
import { RefreshCcw } from "lucide-react";
import { useSalesPreviewModal } from "@/components/modals/sales-preview-modal";

export function Footer({}) {
    const store = salesOverviewStore();
    const sPreview = useSalesPreviewModal();
    function preview() {
        sPreview.preview(store.overview?.orderId, store.overview.type as any);
    }
    return (
        <div className="flex gap-4 py-2 border-t w-full">
            <div className="flex-1"></div>
            <ConfirmBtn
                size="icon"
                Icon={Icons.trash}
                onClick={async () => {
                    const id = store?.salesId;
                    await deleteSalesUseCase(id);
                    // ctx.refreshList?.();
                    toast("Deleted", {
                        action: {
                            label: "Undo",
                            onClick: async () => {
                                await restoreDeleteUseCase(id);
                                // ctx.refreshList?.();
                            },
                        },
                    });
                    // ctx.closeModal();
                }}
                trash
                variant="destructive"
            />
            <Button
                className="bg-purple-600 hover:bg-purple-700"
                variant="destructive"
                size="xs"
                onClick={preview}
            >
                Preview
            </Button>
            {store.adminMode && (
                <>
                    <Button
                        onClick={() => {
                            if (!store.overview?.phoneNo)
                                toast.error("Payment requires phone number.");
                            else
                                openTxForm({
                                    phoneNo: store.overview?.phoneNo,
                                    paymentMethod: "terminal",
                                    payables: [
                                        {
                                            amountDue: store.overview.due,
                                            id: store.overview.id,
                                            orderId: store.overview.orderId,
                                        },
                                    ],
                                });
                        }}
                        size="xs"
                        disabled={!store.overview?.due}
                    >
                        <Icons.dollar className="size-4 mr-2" />
                        <Money value={store.overview?.due}></Money>
                    </Button>
                </>
            )}
            <Menu variant="outline">
                <PrintMenuAction />
                <PrintMenuAction pdf />
                <CopyMenuAction />
                <MoveMenuAction />
                {/* <DevOnly> */}
                <Menu.Item
                    Icon={RefreshCcw}
                    onClick={async () => {
                        await resetSalesStatAction(store.overview?.id);
                        toast.success("stat reset complete");
                        refreshTabData(store.currentTab);
                    }}
                >
                    Reset Item Stats
                </Menu.Item>
                {/* </DevOnly> */}
            </Menu>
        </div>
    );
}
