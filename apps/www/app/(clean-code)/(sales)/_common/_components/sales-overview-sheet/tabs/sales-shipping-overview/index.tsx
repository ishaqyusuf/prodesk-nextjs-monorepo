import Button from "@/components/common/button";
import { salesOverviewStore } from "../../store";
import { Icons } from "@/components/_v1/icons";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TCell } from "@/components/(clean-code)/data-table/table-cells";
import { Menu } from "@/components/(clean-code)/menu";
import Link from "next/link";

export function SalesShippingOverview({}) {
    const store = salesOverviewStore();
    const shipping = store.shipping;
    if (!shipping) return null;
    return (
        <div className="flex-col gap-4">
            <div className="border-b gap-4 py-2 flex">
                <div className="flex-1"></div>
                <Button asChild size="xs" variant="secondary">
                    <Link href={``}>
                        <Icons.print className="size-4 mr-2" />
                        <span>Print Alls</span>
                    </Link>
                </Button>
                <Button
                    onClick={() => {
                        store.update("currentTab", "shipping_form");
                    }}
                    size="xs"
                >
                    <Icons.add className="size-4 mr-2" />
                    <span>Create</span>
                </Button>
            </div>
            <div className="">
                <Table className="styled table-sm">
                    <TableHeader className="uppercase font-mono">
                        <TableHead>Date</TableHead>
                        <TableHead>Dispatch #</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                    </TableHeader>
                    <TableBody>
                        {shipping?.dispatches?.map((dispatch) => (
                            <TableRow key={dispatch.id}>
                                <TCell>
                                    <TCell.Date>{dispatch.date}</TCell.Date>
                                </TCell>
                                <TCell>
                                    <TCell.Primary>
                                        {dispatch.uid}
                                    </TCell.Primary>
                                </TCell>
                                <TCell>
                                    <TCell.Status
                                        status={dispatch.deliveryMode}
                                    />
                                </TCell>
                                <TCell>
                                    <TCell.Status
                                        status={dispatch.assignedTo?.name}
                                    />
                                </TCell>
                                <TCell>
                                    <TCell.Status status={dispatch.status} />
                                </TCell>
                                <TCell align="right" className="action">
                                    {/* <ConfirmBtn trash /> */}
                                    <Menu>
                                        <Menu.Item>Print</Menu.Item>
                                        <Menu.Item>Status</Menu.Item>
                                        <Menu.Trash>Delete</Menu.Trash>
                                    </Menu>
                                </TCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
