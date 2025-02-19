import { useForm } from "react-hook-form";
import { txStore } from "./store";
import {
    cancelTerminalCheckoutAction,
    checkTerminalPaymentStatusAction,
    createTerminalPaymentAction,
    CreateTerminalPaymentAction,
    paymentReceivedAction,
} from "../../data-actions/sales-payment/terminal-payment.action";
import { useEffect, useState } from "react";
import {
    createTransactionUseCase,
    getPaymentTerminalsUseCase,
} from "../../use-case/sales-payment-use-case";
import { toast } from "sonner";
import { _modal } from "@/components/common/modal/provider";
import { isProdClient } from "@/lib/is-prod";
import { useInfiniteDataTable } from "@/components/(clean-code)/data-table/use-data-table";
import { revalidateTable } from "@/components/(clean-code)/data-table/use-infinity-data-table";

export type UsePayForm = ReturnType<typeof usePayForm>;
export const usePayForm = () => {
    const tx = txStore();
    const form = useForm({
        defaultValues: {
            terminal: null as CreateTerminalPaymentAction["resp"],
            paymentMethod: tx.paymentMethod,
            amount: tx.totalPay,
            checkNo: null,
            deviceId: null,
            enableTip: false,
        },
    });
    const profile = tx.customerProfiles[tx.phoneNo];
    useEffect(() => {
        form.setValue("amount", tx.totalPay);
    }, [tx.totalPay]);
    const [pm, totalPay, terminal] = form.watch([
        "paymentMethod",
        "amount",
        "terminal",
    ]);
    useEffect(() => {
        if (!tx.terminals?.length && pm == "terminal") {
            getPaymentTerminalsUseCase()
                .then((terminals) => {
                    tx.dotUpdate("terminals", terminals.devices);
                    form.setValue("deviceId", terminals.lastUsed);
                })
                .catch((e) => {
                    toast.error(e.message);
                    form.setError("paymentMethod", {
                        message: e.message,
                    });
                });
        }
    }, [pm, tx.terminals]);

    async function terminalPay() {
        setWaitSeconds(null);
        const data = form.getValues();
        const deviceName = tx.terminals?.find(
            (t) => t.value == data.deviceId
        )?.label;
        const amount = +data.amount;

        const resp = await createTerminalPaymentAction({
            amount,
            deviceId: data.deviceId,
            allowTipping: data.enableTip,
            deviceName,
        });

        if (resp.error) {
            toast.error(resp.error.message);
        } else {
            form.setValue("terminal", resp.resp);
            setWaitSeconds(0);
            // await terminalPaymentUpdate();
        }
    }
    const [waitSeconds, setWaitSeconds] = useState(null);
    useEffect(() => {
        const status = terminal?.status;
        if (status == "PENDING") {
            console.log(waitSeconds);
            // if (waitSeconds) {
            //     return;
            // }
            // console.log("TERMINAL CHANGED", terminal);
            terminalPaymentUpdate();
        }
    }, [terminal, waitSeconds]);
    async function paymentReceived() {
        const { resp, error } = await paymentReceivedAction(
            terminal?.squarePaymentId,
            terminal?.squareCheckout?.id
        );
        if (resp || !isProdClient) {
            await pay();
        } else {
            toast.error(error?.message);
        }
    }
    async function cancelTerminalPayment() {
        const { resp, error } = await cancelTerminalCheckoutAction(
            terminal?.squareCheckout?.id,
            terminal?.squarePaymentId
        );
        console.log(error, resp, terminal);

        if (error) {
            toast.error(error.message);
        } else form.setValue("terminal", null);
    }
    async function terminalPaymentUpdate() {
        return new Promise((resolve, reject) => {
            setTimeout(
                async () => {
                    // console.log(terminal);
                    // if (waitSeconds > 10) return;
                    const status = terminal?.status;
                    if (status == "PENDING") {
                        const response = await checkTerminalPaymentStatusAction(
                            {
                                checkoutId: terminal.squareCheckout?.id,
                            }
                        );
                        // form.setValue('terminal.status',response.status)
                        switch (response.status) {
                            case "COMPLETED":
                                form.setValue("terminal.tip", response.tip);
                                form.setValue("terminal.status", "COMPLETED");
                                await paymentReceived();
                                break;
                            case "CANCELED":
                            case "CANCEL_REQUESTED":
                                form.setValue("terminal.status", "CANCELED");
                                await cancelTerminalPayment();
                                break;
                            default:
                                setWaitSeconds((waitSeconds || 0) + 1);
                                break;
                        }
                    }
                },
                waitSeconds > 5 ? 2000 : waitSeconds > 10 ? 3000 : 1500
            );
        });
    }
    const tableCtx = useInfiniteDataTable();
    async function pay() {
        const data = form.getValues();
        const selections = profile?.salesInfo?.orders?.filter(
            (o) => tx.selections?.[o.orderId]
        );
        const r = await createTransactionUseCase({
            accountNo: tx.phoneNo,
            amount: +data.amount,
            paymentMode: data.paymentMethod,
            salesIds: selections?.map((a) => a.id),
            description: "",
            squarePaymentId: data.terminal?.squarePaymentId,
        });
        revalidateTable();
        _modal.close();
        toast.success("Payment Applied");
    }
    return {
        form,
        tx,
        terminalPay,
        pay,
        terminal,
        totalPay,
        pm,
        terminalWaitSeconds: waitSeconds,
        paymentReceived,
        cancelTerminalPayment,
    };
};
