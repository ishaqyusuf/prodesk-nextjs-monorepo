import { Label } from "@/components/ui/label";
import { useInfiniteDataTable } from "../use-data-table";
import { Button } from "@/components/ui/button";
import { IconKeys, Icons } from "@/components/_v1/icons";
import { Menu } from "../../menu";
import { cn } from "@/lib/utils";
import ConfirmBtn from "@/components/_v1/confirm-btn";
import { toast } from "sonner";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
export function BatchAction({ children = null }) {
    const ctx = useInfiniteDataTable();
    const selectCount = ctx.selectedRows?.length;
    const total = ctx.totalRowsFetched;
    const ref = useRef(undefined);
    const [show, setShow] = useState(false);
    if (!ctx.checkMode) return null;
    return (
        <div
            ref={ref}
            className={cn(
                show
                    ? "fixed left-1/2 transform -translate-x-1/2 m-4 bottom-10 z-10"
                    : "hidden"
            )}
        >
            <motion.div
                onAnimationStart={(e) => {
                    setShow(true);
                }}
                onAnimationEnd={(e) => {
                    console.log("LEAVING>>");
                }}
                onViewportEnter={(e) => {
                    setShow(true);
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                    opacity: ctx.checkMode ? 1 : 0,
                    scale: ctx.checkMode ? 1 : 0,
                }}
                className="border flex sgap-4 items-center rounded-xl bg-white overflow-hidden border-muted-foreground/50 divide-x divide-muted-foreground/50 shadow-xl relative"
            >
                {/* <div className="border flex sgap-4 items-center rounded-xl bg-white overflow-hidden border-muted-foreground/50 divide-x divide-muted-foreground/50 shadow-xl  relative "> */}
                <Label className="font-mono px-2">
                    <span className="font-bold">{selectCount}</span>
                    {" of "}
                    <span className="font-bold">{total}</span>
                    {" selected"}
                </Label>
                {children}
                <Button
                    className="rounded-none"
                    onClick={() => {
                        ctx.table.toggleAllPageRowsSelected(false);
                    }}
                    variant="ghost"
                >
                    <Icons.X className="size-4" />
                </Button>
                {/* </div> */}
            </motion.div>
        </div>
    );
}

interface BatchBtnProps {
    icon?: IconKeys;
    children?;
    menu?;
    onClick?;
}
export function BatchBtn(props: BatchBtnProps) {
    const Icon = Icons[props.icon];
    if (props.menu)
        return (
            <Menu
                Trigger={
                    <Button className="rounded-none" variant="ghost">
                        {Icon && <Icon className={cn("size-3.5 mr-2")} />}
                        {props.children}
                    </Button>
                }
            >
                {props.menu}
            </Menu>
        );
    return <Button>{props.children}</Button>;
}
export function BatchDelete(props: BatchBtnProps) {
    let ctx = useInfiniteDataTable();
    return (
        <ConfirmBtn
            onClick={async () => {
                await props?.onClick();
                toast.success("Delete successful");
                ctx.table.toggleAllPageRowsSelected(false);
                ctx.refetch();
            }}
            variant="ghost"
            trash
            className="text-red-600 rounded-none"
        >
            {/* <div className="flex items-center"> */}
            {/* <Icons.trash className="size-3.5 mr-2" /> */}
            <span>Delete</span>
            {/* </div> */}
        </ConfirmBtn>
    );
}
