import { Menu } from "@/components/(clean-code)/menu";
import { useSalesOverview } from "./overview-provider";
import { cn } from "@/lib/utils";

export default function SalesOverviewHeader({ className = "" }) {
    const { item, dataKey } = useSalesOverview();
    return (
        <>
            <div
                className={cn(
                    "items-center p-4 flex justify-between gap-4",
                    className
                )}
            >
                <div className="">
                    <h1>{item.orderId}</h1>
                </div>
                <div className="flex-1"></div>
                <Menu>
                    <Menu.Item>Print</Menu.Item>
                </Menu>
            </div>
        </>
    );
}
