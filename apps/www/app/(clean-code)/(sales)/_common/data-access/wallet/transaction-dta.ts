import { prisma } from "@/db";
import { SalesPaymentStatus, SalesTransaction } from "../../../types";
import {
    applyPaymentDta,
    fundCustomerWalletDta,
    getCustomerWalletDta,
} from "./wallet-dta";
import { getCustomerIdByPhoneNo } from "../customer.dta";

// transactions -> payments -> checkout
export async function createTransactionDta(data: SalesTransaction) {
    return await prisma.$transaction((async (tx) => {
        const wallet = await getCustomerWalletDta(data.accountNo);
        const saleslist = await getSalesPendingPayments(data.salesIds);
        switch (data.paymentMode) {
            // case "terminal":
            //     break;
            case "link":
                break;
            default:
                let balance = +data.amount;
                const tx = await fundCustomerWalletDta({
                    accountId: wallet.id,
                    amount: balance,
                    paymentMethod: data.paymentMode,
                    description: data.description,
                    squarePaymentId: data.squarePaymentId,
                });
                const transactionIds = await Promise.all(
                    saleslist.map(async (orderItem) => {
                        let payAmount =
                            balance > orderItem.amountDue
                                ? orderItem.amountDue
                                : balance;
                        balance -= payAmount;
                        let customerId =
                            orderItem.customerId ||
                            (await getCustomerIdByPhoneNo(data.accountNo));
                        if (!customerId)
                            throw Error(
                                `Customer not found for ${data.accountNo}`
                            );
                        if (payAmount) {
                            const res = await createSalesPaymentTransactionDta({
                                amount: payAmount,
                                customerId,
                                orderId: orderItem.id,
                                paymentMethod: data.paymentMode,
                                transactionId: tx.id,
                                status: "created",
                            });
                            return res.id;
                        }
                    })
                );
                await applyPaymentDta(
                    wallet.id,
                    transactionIds.filter(Boolean)
                );
                break;
        }
    }) as any);
}

export async function getSalesPendingPayments(salesIds) {
    const ls = await prisma.salesOrders.findMany({
        where: {
            id: {
                in: salesIds,
            },
        },
        select: {
            id: true,
            orderId: true,
            amountDue: true,
            customerId: true,
        },
    });
    return ls;
}
export async function createSalesCheckout({ paymentId }) {
    const payment = await getSalesPayment(paymentId);
    return await prisma.salesCheckout.create({
        data: {
            amount: payment.amount,
            paymentType: payment.transaction.paymentMethod,
            status: payment.status,
            order: {
                connect: {
                    id: payment.id,
                },
            },
        },
    });
}
export async function getSalesPayment(id) {
    return await prisma.salesPayments.findFirstOrThrow({
        where: { id },
        include: {
            transaction: {
                select: {
                    paymentMethod: true,
                },
            },
        },
    });
}
interface CreateSalesPaymentTxProps {
    amount;
    orderId;
    transactionId;
    customerId;
    paymentMethod;
    status: SalesPaymentStatus;
}
export async function createSalesPaymentTransactionDta({
    amount,
    orderId,
    transactionId,
    customerId,
    paymentMethod,
    status = "created",
}: CreateSalesPaymentTxProps) {
    const payment = await prisma.salesPayments.create({
        data: {
            amount: amount,
            status: "created" as SalesPaymentStatus,
            order: {
                connect: { id: orderId },
            },
            customer: {
                connect: { id: customerId },
            },
        },
    });
    return payment;
}
