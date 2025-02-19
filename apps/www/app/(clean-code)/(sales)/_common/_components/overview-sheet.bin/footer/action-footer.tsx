import { Menu } from "@/components/(clean-code)/menu";
import ConfirmBtn from "@/components/_v1/confirm-btn";
import { Icons } from "@/components/_v1/icons";
import { useSalesOverview } from "../overview-provider";
import { toast } from "sonner";
import { RefreshCcw } from "lucide-react";
import { CopyAction } from "./copy.action";
import {
    deleteSalesUseCase,
    restoreDeleteUseCase,
} from "../../../use-case/sales-use-case";
import { MoveAction } from "./move.action";
import { PrintAction } from "./print.action";
import { PayAction } from "./pay.action";
import { Button } from "@/components/ui/button";
import { openSalesOverview } from "../../sales-overview-sheet";

export default function ActionFooter({}) {
    const ctx = useSalesOverview();

    return (
        <div className="absolute flex gap-4 bottom-0 px-4 py-2 bg-white border-t sbg-muted w-full shadow-sm">
            <div className="flex-1"></div>
            <Button
                onClick={() => {
                    ctx.closeModal();
                    openSalesOverview({
                        salesId: ctx.item?.id,
                    });
                }}
            >
                NEW SHEET
            </Button>
            <PayAction />
            <ConfirmBtn
                size="icon"
                Icon={Icons.trash}
                onClick={async () => {
                    const id = ctx.item.id;
                    await deleteSalesUseCase(id);
                    ctx.refreshList?.();
                    toast("Deleted", {
                        action: {
                            label: "Undo",
                            onClick: async () => {
                                await restoreDeleteUseCase(id);
                                ctx.refreshList?.();
                            },
                        },
                    });
                    ctx.closeModal();
                }}
                trash
                variant="destructive"
            />
            <Menu variant="outline">
                <PrintAction />
                <PrintAction pdf />
                <Menu.Item
                    Icon={RefreshCcw}
                    onClick={() => {
                        ctx.refresh().then((r) => {
                            toast.success("Refreshed");
                        });
                    }}
                >
                    Refresh
                </Menu.Item>
                <CopyAction />
                <MoveAction />
            </Menu>
        </div>
    );
}
