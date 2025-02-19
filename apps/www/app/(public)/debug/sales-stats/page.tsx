"use client";

import SalesStat from "@/app/(clean-code)/(sales)/_backward-compat/sales-stat";
import { Menu } from "@/components/(clean-code)/menu";
import Button from "@/components/common/button";
import { Command, CommandInput, CommandList } from "@/components/ui/command";
import { useState } from "react";

export default function CommandInputPage({}) {
    return (
        <>
            <Menu>
                <SalesStat />
            </Menu>
        </>
    );
}
