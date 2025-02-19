"use server";

import { prisma } from "@/db";
import { getSalesCustomerTxAction } from "./get-sales-customers-tx";

export async function getOrderTransactionHistoryAction(id) {
    const transactions = await getSalesCustomerTxAction({
        "sales.id": id,
    });
    return transactions;
}
