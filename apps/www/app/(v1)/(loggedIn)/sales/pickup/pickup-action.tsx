"use client";
import Btn from "@/components/_v1/btn";
import { ToolTip } from "@/components/_v1/tool-tip";
import { CheckCircle, Undo } from "lucide-react";

import { useTransition } from "react";
import { ISalesOrder } from "@/types/sales";

import { toast } from "sonner";
import { _cancelSalesPickup } from "@/app/(v1)/(loggedIn)/sales/_actions/_sales-pickup";
import { useModal } from "@/components/common/modal/provider";
import PickupModal from "./pickup-modal";

interface IProp {
    item: ISalesOrder;
}
export const PickupAction = ({ item }: IProp) => {
    const [isPending, startTransition] = useTransition();
    const modal = useModal();
    return (
        <div className="flex items-end space-x-2">
            {!item.pickup ? (
                <ToolTip info="Submit Production">
                    <Btn
                        icon
                        onClick={() => {
                            modal.openModal(<PickupModal order={item} />);
                        }}
                        isLoading={isPending}
                        className="h-8  w-8 bg-green-500 p-0"
                    >
                        <CheckCircle className="h-4 w-4" />
                    </Btn>
                </ToolTip>
            ) : (
                <ToolTip info="Reverse Production">
                    <Btn
                        icon
                        onClick={async () => {
                            startTransition(async () => {
                                await _cancelSalesPickup(item.id);
                                toast.success("Pickup cancelled");
                            });
                        }}
                        isLoading={isPending}
                        className="h-8  w-8 bg-red-500 p-0"
                    >
                        <Undo className="h-4 w-4" />
                    </Btn>
                </ToolTip>
            )}
        </div>
    );
};
