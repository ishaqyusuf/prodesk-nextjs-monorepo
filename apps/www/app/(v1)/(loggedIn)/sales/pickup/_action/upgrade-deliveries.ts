"use server";

import { prisma } from "@/db";
import { DeliveryOption } from "@/types/sales";
import { OrderDelivery, OrderItemDelivery } from "@prisma/client";

export async function upgradeDeliveries() {
    // deliveries
    const orders = await prisma.salesOrders.findMany({
        where: {
            deliveryOption: "delivery" as DeliveryOption,
            // deliveredAt: {
            //     not: null,
            // },
            // status: {
            //     not: "delivered",
            // },
            status: "delivered",

            deliveries: {
                none: {
                    id: {
                        gt: 0,
                    },
                },
            },
        },
        include: {
            items: true,
        },
    });
    let currentId = await prisma.orderDelivery.count({});
    let orderDeliveries: Partial<OrderDelivery>[] = [];
    let orderDeliveryItems: Partial<OrderItemDelivery>[] = [];
    orders.map((order) => {
        ++currentId;
        orderDeliveries.push({
            id: currentId,
            // approvedById: order.salesRepId,
            deliveryMode: "delivery",
            meta: {},
            salesOrderId: order.id,
            createdAt: order.deliveredAt || new Date(),
        });
        order.items.map((item) => {
            if (item.swing)
                orderDeliveryItems.push({
                    meta: {},
                    orderDeliveryId: currentId,
                    orderItemId: item.id,
                    orderId: order.id,
                    qty: item.qty || 0,
                });
        });
    });
    const pickupOrders = await prisma.salesOrders.findMany({
        where: {
            deliveryOption: "pickup" as DeliveryOption,
            // deliveredAt: {
            //     not: null,
            // },
            // status: {
            //     not: "delivered",
            // },
            // status: "delivered",
            pickup: {
                isNot: null,
            },
            deliveries: {
                none: {
                    id: {
                        gt: 0,
                    },
                },
            },
        },
        include: {
            items: true,
            pickup: true,
        },
    });
    pickupOrders.map((order) => {
        ++currentId;
        orderDeliveries.push({
            id: currentId,
            // approvedById: order?.pickup?.pickupApprovedBy,
            deliveryMode: "pickup",
            meta: order.pickup?.meta || {},
            createdAt:
                order.pickup?.pickupAt || order.deliveredAt || new Date(),
            salesOrderId: order.id,
            deliveredTo: order.pickup?.pickupBy,
        });
        order.items.map((item) => {
            if (item.swing)
                orderDeliveryItems.push({
                    meta: {},
                    orderDeliveryId: currentId,
                    orderItemId: item.id,
                    orderId: order.id,
                    qty: item.qty || 0,
                });
        });
    });
    await prisma.orderDelivery.createMany({
        data: orderDeliveries as any,
    });
    await prisma.orderItemDelivery.createMany({
        data: orderDeliveryItems as any,
    });
    // return [orderDeliveries.length, orderDeliveryItems.length];
    return pickupOrders.length;
}
