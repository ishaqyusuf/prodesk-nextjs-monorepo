import { Button } from "@/components/ui/button";
import { Admin } from "../overview-sheet.bin/common/admin";
import { useSalesItem } from "./item-production-card";
import { Icons } from "@/components/_v1/icons";

export function ItemAssignProd({}) {
    const ctx = useSalesItem();

    return (
        <Admin>
            <div className="flex justify-end gap-4">
                <Button disabled={!ctx.pendingQty} className="">
                    <Icons.add className="size-4" />
                    <span>Assign ({ctx.pendingQty})</span>
                </Button>
            </div>
        </Admin>
    );
}
