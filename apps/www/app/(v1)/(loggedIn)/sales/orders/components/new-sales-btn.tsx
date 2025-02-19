"use client";

import {
    Menu,
    MenuItem,
} from "@/components/_v1/data-table/data-table-row-actions";
import { Icons } from "@/components/_v1/icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
    type?: "quote" | "order" | "customer";
}
function _btns(type) {
    const btns = [
        { text: "Old", href: `/sales/edit/${type}/new` },
        { text: "New", href: `/sales-book/create-${type}` },
    ];
    return btns;
}
function getButtons(type) {
    let title = "New";
    const isCustomer = type == "customer";
    let btns = isCustomer ? null : _btns(type);
    let links = isCustomer
        ? ["order", "quote"].map((s) => ({
              title: s,
              btns: _btns(s),
          }))
        : null;
    return {
        title,
        links,
        btns,
    };
}
export default function NewSalesBtn({ type }: Props) {
    const [ctx, setBtns] = useState<any>({});
    useEffect(() => {
        setBtns(getButtons(type));
    }, []);
    return (
        <div className="flex space-x-2">
            {ctx.links?.map((lnk) => (
                <Menu
                    key={lnk.title}
                    label={lnk.title}
                    variant={lnk.title == "quote" ? "outline" : "default"}
                >
                    {lnk?.btns?.map((l) => (
                        <MenuItem key={l.text} href={l.href}>
                            {l.text}
                        </MenuItem>
                    ))}
                </Menu>
            ))}
            {ctx?.btns?.map((b) => (
                <Button
                    key={b.text}
                    size="sm"
                    variant={b.text == "Old" ? "outline" : "default"}
                    asChild
                >
                    <Link href={b.href}>
                        <Icons.add className="size-4 mr-2" />
                        <span>{b.text}</span>
                    </Link>
                </Button>
            ))}
            {/* <Menu label="New" variant={"default"} Icon={Icons.add}>
                <MenuItem href={"/sales/edit/order/new"}>Sales Form</MenuItem>
                <MenuItem href={"/sales-v2/form/order"}>Sales Form 2</MenuItem>
            </Menu> */}
        </div>
    );
}
