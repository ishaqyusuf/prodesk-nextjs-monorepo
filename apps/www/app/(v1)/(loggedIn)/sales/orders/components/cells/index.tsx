import { SalesTableItem } from "../orders-table-shell";
import SalesFlag from "./sales-flag";
import StatusBadge from "@/components/_v1/status-badge";
import { updateDeliveryModeDac } from "@/app/(v2)/(loggedIn)/sales/_data-access/update-delivery-mode.dac";
import { toast } from "sonner";
import {
    DeleteRowAction,
    Menu,
    MenuItem,
} from "@/components/_v1/data-table/data-table-row-actions";
import salesData from "@/app/(v2)/(loggedIn)/sales/sales-data";
import { Badge } from "@/components/ui/badge";
import { getBadgeColor } from "@/lib/status-badge";
import {
    MenuOption,
    useSalesMenu,
} from "../../../../../../(v2)/(loggedIn)/sales/utils/use-sales-menu";
import {
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { deleteOrderAction } from "../../../_actions/sales";
import { TableCell } from "@/app/_components/data-table/table-cells";

interface Props {
    item: SalesTableItem;
}
function Order({ item }: Props) {
    const href = item.isDyke
        ? `/sales-v2/overview/${item.type}/${item.slug}`
        : `/sales/order/${item.slug}`;
    return (
        <TableCell href={href} className="">
            <TableCell.Medium className={item.isDyke ? "text-orange-500" : ""}>
                {item.orderId}
            </TableCell.Medium>
            <TableCell.Secondary className="inline-flex items-center space-x-2">
                <TableCell.Date>{item.createdAt}</TableCell.Date>
                {/* {item.isDyke && (
                    // <div className="rounded-full bg-pink-500 p-[.5px]   text-xs leading-none text-[#000000]s text-white no-underline group-hover:no-underline">
                    //     <SparklesIcon className="size-4" />
                    // </div>
                    // <SparklesIcon className="size-4 text-pink-700" />
                )} */}
            </TableCell.Secondary>
        </TableCell>
    );
}
function Customer({ item }: Props) {
    let address = item?.shippingAddress || item?.billingAddress;
    if (!address && !item.customer) return <></>;
    const link = "/sales/customer/" + item.customer?.id;
    return (
        <TableCell href={link}>
            <TableCell.Medium className="uppercase">
                {item.customer?.businessName ||
                    item?.customer?.name ||
                    address?.name}
            </TableCell.Medium>
            <TableCell.Secondary>
                {address?.phoneNo || item?.customer?.phoneNo}
            </TableCell.Secondary>
        </TableCell>
    );
}
function Address({ item }: Props) {
    return (
        <TableCell>
            <TableCell.Secondary className="line-clamp-2">
                {item?.shippingAddress?.address1}
            </TableCell.Secondary>
        </TableCell>
    );
}
function SalesRep({ item }: Props) {
    return (
        <TableCell>
            <TableCell.Secondary
                className={!item?.salesRep?.name && "text-red-500"}
            >
                {item?.salesRep?.name || item?.customer?.businessName}
            </TableCell.Secondary>
        </TableCell>
    );
}
function Invoice({ item }: Props) {
    if (!item.amountDue || item.amountDue == item.grandTotal)
        return (
            <TableCell>
                <TableCell.Money
                    className={
                        !item.amountDue
                            ? "text-green-500 font-semibold"
                            : "text-red-500"
                    }
                >
                    {item.grandTotal}
                </TableCell.Money>
            </TableCell>
        );
    return (
        <TableCell>
            <TableCell.Primary>
                <TableCell.Money>{item.grandTotal}</TableCell.Money>
            </TableCell.Primary>
            <TableCell.Secondary className="text-red-500">
                ( <TableCell.Money>{item.amountDue}</TableCell.Money>)
            </TableCell.Secondary>
        </TableCell>
    );
}
function PaymentDueDate({ item }: Props) {
    return (
        <TableCell>
            <TableCell.Date>{item.paymentDueDate}</TableCell.Date>
        </TableCell>
    );
}
function Dispatch({ item }: Props) {
    const date =
        item.pickup?.pickupAt || item.pickup?.createdAt || item.deliveredAt;
    function Content() {
        return (
            <>
                <span className="capitalize">
                    <StatusBadge status={item.deliveryOption || "not set"} sm />
                    {date && <TableCell.Date>{date}</TableCell.Date>}
                </span>
            </>
        );
    }
    async function updateDeliveryMode(delivery) {
        if (delivery != item.deliveryOption) {
            await updateDeliveryModeDac(
                item.id,
                delivery,
                item.type == "order" ? "orders" : "quotes",
            );

            toast.success("Updated");
        }
    }
    if (date) return <Content />;

    return (
        <TableCell>
            <Menu
                Trigger={
                    <button>
                        <Content />
                    </button>
                }
            >
                {salesData.delivery.map((o) => (
                    <MenuItem
                        onClick={() => updateDeliveryMode(o.value)}
                        key={o.value}
                    >
                        {o.text}
                    </MenuItem>
                ))}
            </Menu>{" "}
        </TableCell>
    );
}
function Status({ item, delivery }: Props & { delivery? }) {
    let status: any = item?.prodStatus;
    if (["In Transit", "Return", "Delivered"].includes(item?.status as any))
        status = item?.status;
    if (!status) status = delivery ? "-" : item?.prodId ? "Prod Queued" : "";
    if (status == "Completed" && delivery) status = "Ready";
    const color = getBadgeColor(status || "");

    // return (
    //     <div className="min-w-16">
    //         <Badge
    //             variant={"secondary"}
    //             className={`h-5 px-1 whitespace-nowrap text-xs text-slate-100 ${color}`}
    //         >
    //             {/* {order?.prodStatus || "-"} */}
    //             {status || "no status"}
    //         </Badge>

    //         {delivery && order?.deliveredAt && (
    //             <DateCellContent>{order.deliveredAt}</DateCellContent>
    //         )}
    //     </div>
    // );
    return (
        <TableCell>
            <Badge
                variant={"secondary"}
                className={`h-5 px-1 whitespace-nowrap text-xs text-slate-100 ${color}`}
            >
                {/* {order?.prodStatus || "-"} */}
                {status || "no status"}
            </Badge>

            {delivery && item?.deliveredAt && (
                <TableCell.Date>{item.deliveredAt}</TableCell.Date>
            )}
        </TableCell>
    );
}
function SalesAction({ item }: Props) {
    const ctx = useSalesMenu(item);
    function Render({ option }: { option: MenuOption }) {
        if (option.groupTitle)
            return (
                <>
                    <DropdownMenuLabel>{option.groupTitle}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                </>
            );
        return (
            <MenuItem
                href={option.href}
                onClick={option.action}
                icon={option.icon}
                key={option.title}
                SubMenu={option?.subMenu?.map((s, si) => (
                    <Render key={si} option={s} />
                ))}
            >
                {option.title}
            </MenuItem>
        );
    }
    return (
        <>
            <Menu>
                {/* <MenuItem icon="menu"></MenuItem> */}
                {ctx.options?.map((option, oi) => (
                    <Render option={option} key={oi} />
                ))}
                <DeleteRowAction menu row={item} action={deleteOrderAction} />
            </Menu>
        </>
    );
}
function SalesStatus({ item }: Props) {
    let delivery = null;
    let status: any = item?.prodStatus;
    if (["In Transit", "Return", "Delivered"].includes(item?.status as any))
        status = item?.status;
    if (!status) status = delivery ? "-" : item?.prodId ? "Prod Queued" : "";
    if (status == "Completed" && delivery) status = "Ready";
    const color = getBadgeColor(status || "");
    return (
        <TableCell>
            <Badge
                variant={"secondary"}
                className={`h-5 px-1 whitespace-nowrap text-xs text-slate-100 ${color}`}
            >
                {/* {order?.prodStatus || "-"} */}
                {status || "no status"}
            </Badge>

            {delivery && item?.deliveredAt && (
                <TableCell.Date>{item.deliveredAt}</TableCell.Date>
            )}
        </TableCell>
        //   <div className="min-w-16">

        //   </div>
    );
}
export let SalesCells = {
    SalesRep,
    SalesStatus,
    Status,
    Order,
    Customer,
    Flag: SalesFlag,
    Address,
    PaymentDueDate,
    Invoice,
    Dispatch,
    SalesAction,
};
