"use client";

import {
    Menu,
    MenuItem,
} from "@/components/_v1/data-table/data-table-row-actions";
import { Banknote, Plus, ShoppingBag } from "lucide-react";
interface Props {
    customer;
}
export default function CustomerMenu({ customer }: Props) {
    return (
        <Menu label="New" variant="secondary" Icon={Plus}>
            <MenuItem
                Icon={Banknote}
                href={`/sales/quote/new/form?customerId=${customer.id}`}
            >
                Quote
            </MenuItem>
            <MenuItem
                Icon={ShoppingBag}
                href={`/sales/order/new/form?customerId=${customer.id}`}
            >
                Order
            </MenuItem>
        </Menu>
    );
}
