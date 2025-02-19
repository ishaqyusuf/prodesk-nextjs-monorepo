import { useEffect, useMemo } from "react";
import { Payables, txStore } from "./store";
import { PaymentMethods } from "../../../types";
import { _modal } from "@/components/common/modal/provider";
import Modal from "@/components/common/modal";
import { ScrollArea } from "@/components/ui/scroll-area";
import PayForm from "./pay-form";
import CustomerSelector from "./customer-selector";
import { getCustomerOverviewUseCase } from "../../use-case/customer-use-case";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TCell } from "@/components/(clean-code)/data-table/table-cells";
import { formatMoney } from "@/lib/use-number";
import { cn, sum } from "@/lib/utils";

interface Props {}
export function openTxForm({
    phoneNo,
    paymentMethod,
    payables,
}: {
    phoneNo?;
    paymentMethod?: PaymentMethods;
    payables?: Payables[];
}) {
    const selections = {};
    payables?.map((p) => (selections[p.orderId] = true));
    const store = txStore.getState();
    store.initialize({
        phoneNo,
        paymentMethod,
        selections,
        totalPay: formatMoney(sum(payables?.map((p) => p.amountDue))),
    });
    // setTimeout(() => {
    //     store.dotUpdate("paymentMethod", paymentMethod);
    // }, 500);
    _modal.openSheet(<TxForm />);
}
export function TxForm({}) {
    const tx = txStore();
    useEffect(() => {
        // tx.reset();
        // console.log(tx.phoneNo);
        if (!tx.customerProfiles?.[tx.phoneNo] && tx.phoneNo) {
            getCustomerOverviewUseCase(tx.phoneNo)
                .then((result) => {
                    tx.dotUpdate(`customerProfiles.${tx.phoneNo}`, result);
                })
                .catch((e) => {
                    toast.error("Unable to load customer data");
                });
        }
    }, [tx.phoneNo]);

    const profile = tx.customerProfiles[tx.phoneNo];
    // if (!tx.phoneNo || !tx.payables?.length) return null;
    return (
        <Modal.Content className="side-modal-rounded">
            <Modal.Header
                onBack={
                    tx.phoneNo
                        ? (e) => {
                              tx.dotUpdate("phoneNo", null);
                          }
                        : null
                }
                title={profile?.profile?.displayName || "Pay Portal"}
                subtitle={profile?.profile?.phoneNo}
            />
            {tx.phoneNo ? <></> : <CustomerSelector />}
            <TxFormContent />
            <PayForm />
            {/* {!tx.totalPay} */}
        </Modal.Content>
    );
}
function TxFormContent({}) {
    const tx = txStore();
    const profile = tx.customerProfiles[tx.phoneNo];

    if (!profile) return null;
    return (
        <ScrollArea className="flex-1 -mx-6 px-6">
            <div className="">
                <Table className="">
                    <TableHeader>
                        <TableHead>Date</TableHead>
                        <TableHead className="w-56">Order #</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Pending</TableHead>
                    </TableHeader>
                    <TableBody>
                        {profile.salesInfo?.orders
                            ?.filter((s) => s.amountDue)
                            .map((order) => (
                                <TableRow
                                    className={cn(
                                        "cursor-pointer",
                                        tx.selections?.[order.orderId]
                                            ? "bg-muted-foreground/10 hover:bg-muted-foreground/10"
                                            : ""
                                    )}
                                    onClick={() => {
                                        let c =
                                            !tx?.selections?.[order.orderId];
                                        tx.dotUpdate(
                                            `selections.${order.orderId}`,
                                            c
                                        );
                                        let amount = tx.totalPay;
                                        amount +=
                                            order.amountDue * (c ? 1 : -1);
                                        tx.dotUpdate(
                                            "totalPay",
                                            formatMoney(amount)
                                        );
                                    }}
                                    key={order.orderId}
                                >
                                    <TableCell className="p-2">
                                        <TCell.Date>
                                            {order.createdAt}
                                        </TCell.Date>
                                    </TableCell>
                                    <TableCell className="p-2">
                                        <TCell.Secondary className="uppercase font-mono">
                                            {order.orderId}
                                        </TCell.Secondary>
                                    </TableCell>
                                    <TableCell className="p-2" align="right">
                                        <TCell.Money value={order.grandTotal} />
                                    </TableCell>
                                    <TableCell className="p-2" align="right">
                                        <TCell.Money value={order.amountDue} />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </div>
        </ScrollArea>
    );
}
