import { TCell } from "@/components/(clean-code)/data-table/table-cells";
import ConfirmBtn from "@/components/_v1/confirm-btn";
import { GetProductionListPage } from "../../../_common/data-actions/production-actions/productions-list-action";
import { OrderCells } from "./orders-page-cells";
import { Progress } from "@/components/(clean-code)/progress";

export interface ItemProps {
    item: GetProductionListPage["data"][number];
    itemIndex?;
}
export type SalesItemProp = ItemProps["item"];
function Date({ item }: ItemProps) {
    return (
        <TCell>
            <TCell.Secondary className="font-mono">
                {item.alert.date ? (
                    <TCell.Date>{item.alert.date}</TCell.Date>
                ) : (
                    <>N/A</>
                )}
            </TCell.Secondary>
        </TCell>
    );
}
function Order({ item }: ItemProps) {
    return (
        <TCell>
            <TCell.Secondary className="font-mono">
                {item.orderId}
            </TCell.Secondary>
        </TCell>
    );
}
function Alert({ item }: ItemProps) {
    return (
        <TCell>
            <TCell.Secondary className="font-mono flex gap-4">
                {item.completed ? (
                    <></>
                ) : (
                    <TCell.Status
                        color={item.alert.color}
                        status={item.alert.text}
                    />
                )}
            </TCell.Secondary>
        </TCell>
    );
}
function Assignments({ item }: ItemProps) {
    return (
        <TCell>
            <TCell.Secondary className="font-mono flex gap-4">
                <TCell.Status status={item.assignedTo} color={"gray"} />
            </TCell.Secondary>
        </TCell>
    );
}
function Status({ item }: ItemProps) {
    // const status = `${item.stats?.prodCompleted?.score}/${item.stats?.prodCompleted?.total}`;
    const production = item.status?.production;
    return (
        <TCell>
            <Progress>
                <Progress.Status color={production?.color || production?.color}>
                    {production?.scoreStatus || production?.status}
                </Progress.Status>
            </Progress>
        </TCell>
    );
}

function Action({ item }: ItemProps) {
    return (
        <>
            {/* <ConfirmBtn trash size="icon" variant="ghost" /> */}
            {/* <div>a</div>
            <div>a</div> */}
        </>
    );
}
export let Cells = {
    Action,
    Date,
    Alert,
    Order,
    SalesRep: OrderCells.SalesRep,
    Assignments,
    Status,
};
