"use client";

import { TableCol } from "@/components/common/data-table/table-cells";
import { PayableProm } from "./payable-tables";
import LinkableNode from "@/components/_v1/link-node";
import dayjs from "dayjs";
import {
    Menu,
    MenuItem,
} from "@/components/_v1/data-table/data-table-row-actions";
import { Icons } from "@/components/_v1/icons";
import { useModal } from "@/components/common/modal/provider";
import DueDateModal from "../../_modals/due-date-modal";
import SendEmailSheet from "@/components/_v2/email/send-email";

interface Props {
    item: PayableProm["Item"];
}

function Customer({ item }: Props) {
    return (
        <TableCol>
            <LinkableNode href={""}>
                <TableCol.Primary>
                    {item.customer?.businessName || item.customer?.name}
                </TableCol.Primary>
                <TableCol.Secondary>
                    {item.customer?.phoneNo}
                </TableCol.Secondary>
            </LinkableNode>
        </TableCol>
    );
}
function Order({ item }: Props) {
    return (
        <TableCol>
            <LinkableNode href={item.orderId}>
                <TableCol.Secondary>{item.orderId}</TableCol.Secondary>
            </LinkableNode>
        </TableCol>
    );
}
function Invoice({ item }: Props) {
    return (
        <TableCol>
            <TableCol.Primary>
                <TableCol.Money value={item.amountDue} />
            </TableCol.Primary>
        </TableCol>
    );
}
function DueDate({ item }: Props) {
    let dateDiff = item.goodUntil
        ? dayjs(item.goodUntil).diff(dayjs(), "day")
        : null;
    let note = !dateDiff
        ? null
        : dateDiff > 0
        ? `due in ${dateDiff} day${dateDiff > 1 ? "s" : ""}`
        : dateDiff < 0
        ? `past due`
        : "Due today";
    return (
        <TableCol>
            <TableCol.Secondary>
                {item.goodUntil ? (
                    <TableCol.Date>{item.goodUntil}</TableCol.Date>
                ) : (
                    "Not Set"
                )}
            </TableCol.Secondary>
            {note && <TableCol.Secondary>{note}</TableCol.Secondary>}
        </TableCol>
    );
}
function Options({ item }: Props) {
    const modal = useModal();
    return (
        <Menu Icon={Icons.more}>
            <MenuItem
                Icon={Icons.calendar}
                onClick={() => {
                    modal?.openModal(<DueDateModal item={item} />);
                }}
            >
                Due Date
            </MenuItem>
            <MenuItem
                onClick={() => {
                    modal?.openSheet(
                        <SendEmailSheet
                            data={{
                                parentId: item.id,
                                to: item.customer?.email as any,
                                type: "sales",
                            }}
                            subtitle={`Payable | ${item.orderId}`}
                        />
                    );
                }}
                Icon={Icons.Email}
            >
                Email
            </MenuItem>
        </Menu>
    );
}
export let PayableCells = Object.assign(() => <></>, {
    Customer,
    Order,
    Invoice,
    DueDate,
    Options,
});
