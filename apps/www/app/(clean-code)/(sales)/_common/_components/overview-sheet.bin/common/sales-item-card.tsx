import { cn } from "@/lib/utils";
import { GetSalesOverview } from "../../../use-case/sales-item-use-case";
import { zSalesOverview } from "../utils/store";
import { Admin } from "./admin";

export interface ItemProps {
    group: GetSalesOverview["itemGroup"][number];
    item: GetSalesOverview["itemGroup"][number]["items"][number];
    className?: string;
    itemUid: string;
}
export function SalesItemCard(props: ItemProps) {
    const z = zSalesOverview();
    return (
        <div
            className={cn(
                "bg-white sm:rounded-lg my-3 border",
                props.className
            )}
        ></div>
    );
}

export function SalesItemCardFooter(props: ItemProps) {
    return <Admin>{props.item.analytics}</Admin>;
}
export function SalesItemCardMenu(props: ItemProps) {
    const z = zSalesOverview();
    if (!z.adminMode) return null;
}
