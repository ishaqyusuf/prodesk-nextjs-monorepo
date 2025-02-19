import { Label } from "@/components/ui/label";
import { ItemProps } from "../overview-sheet.bin/common/sales-item-card";
import Badge from "../overview-sheet.bin/components/badge";
import { zSalesOverview } from "../overview-sheet.bin/utils/store";
import { Admin } from "../overview-sheet.bin/common/admin";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Menu } from "@/components/(clean-code)/menu";
import { ItemAssignProd } from "./item-assign-prod";
import { ItemAssignments } from "./item-assignments";
import { cn } from "@/lib/utils";

const SalesItemContext = createContext<ReturnType<typeof useSalesItemContext>>(
    null as any
);
export const useSalesItem = () => useContext(SalesItemContext);
const useSalesItemContext = (props: ItemProps) => {
    const z = zSalesOverview();
    useEffect(() => {
        // z.overview.itemGroup.indexOf()
    }, []);
    function toggleItem() {
        if (z.expandProdItemUID == props.itemUid) {
            z.dotUpdate("expandProdItemUID", null);
        } else {
            //
            if (!props.item?.analytics?.control?.produceable)
                toast.error("Item not produceable");
            else {
                z.dotUpdate("expandProdItemUID", props.itemUid);
            }
        }
    }
    const expanded = useMemo(
        () => z.expandProdItemUID == props.itemUid,
        [z.expandProdItemUID, props.itemUid]
    );
    const pendingQty = props.item?.analytics?.pending?.assignment?.total;
    return {
        ...props,
        pendingQty,
        toggleItem,
        expanded,
    };
};
export function ItemProductionCard(props: ItemProps) {
    const ctx = useSalesItemContext(props);
    const { item } = ctx;
    const z = zSalesOverview();
    return (
        <SalesItemContext.Provider value={ctx}>
            <div
                className={cn(
                    "group sm:rounded-lg my-3 border",
                    ctx.expanded &&
                        "bg-muted/40 shadow-lg border-muted-foreground/40"
                )}
            >
                <div className="flex">
                    <div
                        onClick={() => {
                            ctx.toggleItem();
                        }}
                        className="flex flex-1 gap-4 items-center p-2 px-4 hover:group-[]:bg-muted/40 cursor-pointer"
                    >
                        <Label className="uppercase text-base">
                            {item.title}
                        </Label>
                        <Badge value={item.size} />
                        <Badge value={item.swing} />
                        <div className="flex-1"></div>
                    </div>
                    {/* <div className="flex-1"></div> */}
                    <div className="p-2">
                        <Admin>
                            <Menu>
                                <Menu.Item>Item 1</Menu.Item>
                            </Menu>
                        </Admin>
                    </div>
                </div>
                {(ctx.expanded || !z.adminMode) && (
                    <div className="p-4 border-t">
                        <ItemAssignProd />
                        <ItemAssignments />
                    </div>
                )}
            </div>
        </SalesItemContext.Provider>
    );
}
