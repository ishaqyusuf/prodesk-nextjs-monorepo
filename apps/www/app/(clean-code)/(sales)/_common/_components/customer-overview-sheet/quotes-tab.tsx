import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { customerStore } from "./store";
import { TCell } from "@/components/(clean-code)/data-table/table-cells";

export default function Quotes() {
    const ctx = customerStore();
    return (
        <TabsContent value="quotes">
            <div className="">
                <Table>
                    <TableHeader>
                        <TableHead>Date</TableHead>
                        <TableHead>Order No</TableHead>
                        <TableHead align="right">Amount</TableHead>
                    </TableHeader>
                    <TableBody>
                        {ctx.salesInfo?.quotes?.map((order) => (
                            <TableRow key={order.orderId}>
                                <TCell>
                                    <TCell.Date>{order.createdAt}</TCell.Date>
                                </TCell>
                                <TCell>
                                    <TCell.Secondary className="uppercase font-mono">
                                        {order.orderId}
                                    </TCell.Secondary>
                                </TCell>
                                <TCell align="right">
                                    <TCell.Money value={order.grandTotal} />
                                </TCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </TabsContent>
    );
}
