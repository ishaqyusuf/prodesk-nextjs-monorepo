"use client";

import Money from "@/components/_v1/money";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";

export default function CartHeader() {
    return (
        <div className="inline-flex space-x-1 items-center">
            <Badge variant="destructive" className="px-1.5">
                0
            </Badge>
            <ShoppingCart />
            <Money value={0} />
        </div>
    );
}
