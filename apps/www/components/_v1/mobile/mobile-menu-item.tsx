"use client";

import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "../../ui/button";
import LinkableNode from "../link-node";
import { Icons } from "../icons";

interface Props {
    Icon?;
    children?;
    disabled?: boolean;
    red?: boolean;
    more?: boolean;
    href?;
    label?;
}
export function MobileOption({
    Icon,
    children,
    red,
    href,
    label,
    more,
    ...props
}: Props & ButtonProps) {
    // const Node =
    return (
        <Button
            variant="ghost"
            className={cn(red && "text-red-500")}
            {...props}
        >
            <LinkableNode
                href={href}
                className="flex text-start flex-1 items-center"
            >
                {Icon && <Icon className="size-4 mr-4" />}
                <p className="w-full">{label || children}</p>
                {more && <Icons.chevronRight className="size-4" />}
            </LinkableNode>
        </Button>
    );
}
export function MobileMenu({ children }) {
    return <div className="flex flex-col divide-y">{children}</div>;
}
