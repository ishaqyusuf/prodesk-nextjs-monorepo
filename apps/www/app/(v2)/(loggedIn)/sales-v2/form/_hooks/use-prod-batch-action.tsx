import ConfirmBtn from "@/components/_v1/confirm-btn";
import { Icons } from "@/components/_v1/icons";
import { Label } from "@/components/ui/label";

import { useModal } from "@/components/common/modal/provider";

import { Button } from "@/components/ui/button";
import { useStepItemCtx } from "./use-step-items";
import { useLegacyDykeFormStep } from "@/app/(clean-code)/(sales)/sales-book/(form)/_hooks/legacy/use-dyke-form-step";

export function BatchSelectionAction() {
    const _ctx = useLegacyDykeFormStep();
    const step = useStepItemCtx();
    const modal = useModal();
    function batchDelete() {
        let products = (Object.values(_ctx.selections) as any[])
            .filter((c) => c.selected)
            .map((c) => c.item);

        // console.log({ products });
        _ctx.cancelSelection();
        step.deleteStepItemModal(products);
    }
    if (_ctx.selectCount)
        return (
            <div className="fixed bottom-0 left-0  right-0 md:grid smd:grid-cols-[220px_minmax(0,1fr)]  lg:grid-cols-[240px_minmax(0,1fr)] mb-24 z-10">
                <div className="hidden md:block"></div>
                <div className="flex justify-center">
                    <div className="flex items-center rounded-xl bg-white shadow-lg space-x-4 p-1 px-3 border shadow-muted-foreground justify-center">
                        <Label>
                            {_ctx.selectCount} {" Selected"}
                        </Label>
                        <ConfirmBtn
                            onClick={batchDelete}
                            size="sm"
                            className="h-8"
                            variant="destructive"
                            Icon={Icons.trash}
                        >
                            Delete
                        </ConfirmBtn>
                        <Button
                            onClick={() => {
                                _ctx.cancelSelection();
                            }}
                            size="sm"
                            className="h-8"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </div>
        );
    return <div className="fixed bottom-0 "></div>;
}
