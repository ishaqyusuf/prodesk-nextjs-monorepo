import { Progress } from "@/components/ui/progress";

import { Label } from "@/components/ui/label";
import { GetSalesOrderListItem } from "../../use-case/sales-list-use-case";

interface Props {
    status: GetSalesOrderListItem["stats"]["dispatchCompleted"];
    title?: string;
}
export function SalesItemStatus({ status, title }: Props) {
    return (
        <div className="p-2 px-4  border rounded-lg my-2">
            <div className="mb-2">
                <Label className="">{title}</Label>
            </div>
            <Progress
                className="h-2"
                value={status?.percentage || 0}
                color={"green"}
            />
            <div className="flex text-muted-foreground gap-2 text-xs mt-1">
                <div className="font-mono">
                    {`${status?.score || "-"}/${status?.total || "-"}`}
                </div>
                <div className="flex-1"></div>
                <div className="font-mono">{`${
                    status?.percentage || "-"
                }%`}</div>
            </div>
        </div>
    );
}
