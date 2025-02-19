import { TableCol } from "@/components/common/data-table/table-cells";
import { DispatchPromiseResponse } from "./dispatch-table";
import { ProductionCells } from "../../productions/_components/production-list/sales-prod-cells";
import { useAssignment } from "../../productions/_components/_modals/assignment-modal/use-assignment";
import { Button } from "@/components/ui/button";

interface Props {
    item: DispatchPromiseResponse["Item"];
}

function Order({ item }: Props) {
    return (
        <TableCol>
            <TableCol.Primary>{item.orderId}</TableCol.Primary>
            <TableCol.Secondary>
                <TableCol.Date>{item.createdAt}</TableCol.Date>
            </TableCol.Secondary>
        </TableCol>
    );
}
function Customer({ item }: Props) {
    return (
        <TableCol>
            <TableCol.Primary>
                {item.shippingAddress.name || item.customer.name}
            </TableCol.Primary>
            <TableCol.Secondary>
                {item.shippingAddress.address1 || "-"}
            </TableCol.Secondary>
        </TableCol>
    );
}
const ProductionStatus = ProductionCells.ProductionStatus;

function Actions({ item }: Props) {
    const assignment = useAssignment({ type: "dispatch" });
    return (
        <>
            <Button
                size="sm"
                onClick={() => assignment.open(item.id)}
                variant={"outline"}
            >
                View
            </Button>
        </>
    );
}
function DeliveryStatus({ item }: Props) {}
export let DispatchCells = {
    Order,
    Customer,
    ProductionStatus,
    DeliveryStatus,
    Actions,
};
