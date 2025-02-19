import { TableCol } from "@/components/common/data-table/table-cells";
import { GetCustomers } from "../../../type";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    EditRowAction,
    RowActionCell,
} from "@/components/_v1/data-table/data-table-row-actions";
import AuthGuard from "@/app/(v2)/(loggedIn)/_components/auth-guard";
import { openModal } from "@/lib/modal";
import { Icons } from "@/components/_v1/icons";
import { openLink } from "@/lib/open-link";
import { useSearchParams } from "next/navigation";
import LinkableNode from "@/components/_v1/link-node";
import { cn } from "@/lib/utils";

interface Props {
    item: GetCustomers["data"][0];
}
export let Cells = {
    PendingInvoice({ item }: Props) {
        return (
            <TableCol>
                <TableCol.Money value={item.amountDue} />
            </TableCol>
        );
    },
    Orders({ item }: Props) {
        return (
            <TableCol>
                <TableCol.Primary>{item._count.salesOrders}</TableCol.Primary>
            </TableCol>
        );
    },
    Customer({ item }: Props) {
        const link = "/sales/customer/" + item?.id;
        return (
            <LinkableNode href={link} className={cn("hover:underline")}>
                <TableCol>
                    <TableCol.Primary>
                        {item.businessName || item.name}
                    </TableCol.Primary>
                    <TableCol.Secondary>{item.phoneNo}</TableCol.Secondary>
                </TableCol>
            </LinkableNode>
        );
    },
    Action({ item }: Props) {
        // const modal = useModal
        const search = useSearchParams();
        return (
            <RowActionCell>
                <AuthGuard can={["editOrders"]}>
                    <div className="flex gap-4">
                        <EditRowAction
                            onClick={(e) => {
                                openModal("customerForm", item);
                            }}
                        />
                        <Button
                            onClick={() => {
                                const [_having, _due] = [
                                    search.get("_having"),
                                    search.get("_due"),
                                ];

                                openLink(
                                    "printer/customer-report",
                                    {
                                        slugs: `${item.id}`,
                                        _having,
                                        _due,
                                    },
                                    true
                                );
                            }}
                            size="sm"
                            className="h-8"
                            variant="secondary"
                        >
                            {/* <Icons.reciept className="size-4 mr-2" /> */}
                            Report
                        </Button>
                    </div>
                </AuthGuard>
            </RowActionCell>
        );
    },
    Profile({
        item,
        profiles,
        defaultProfile,
        setCustomerProfile,
    }: Props & { profiles; defaultProfile; setCustomerProfile }) {
        return (
            <TableCol>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            className="flex h-8  data-[state=open]:bg-muted"
                        >
                            <span className="whitespace-nowrap">
                                {item.profile?.title ||
                                    defaultProfile?.title ||
                                    "Select Profile"}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[185px]">
                        {profiles?.data?.map((profile) => (
                            <DropdownMenuItem
                                onClick={() =>
                                    setCustomerProfile(item.id, profile)
                                }
                                key={profile.id}
                            >
                                {profile.title}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCol>
        );
    },
};
