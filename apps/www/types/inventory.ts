import { OrderInventory } from "@prisma/client";

export type IOrderInventory = OrderInventory & {
    product: IOrderInventory;
};
