"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";
import { Icons } from "./_v1/icons";
import { toast } from "sonner";
import { revalidateTable } from "./(clean-code)/data-table/use-infinity-data-table";

export function InlineTextEditor({
    children,
    value,
    className = "",
    onUpdate = null,
}) {
    const [editMode, setEditMode] = useState(false);
    const [_value, setValue] = useState(value);
    const [oldValue, setOldValue] = useState(value);
    async function update() {
        try {
            await onUpdate?.(_value, oldValue);
            setEditMode(false);
            setOldValue(_value);
            toast.success("Saved");
        } catch (error) {
            if (error instanceof Error) toast.error(error.message);
        }
    }
    return (
        <div>
            <span
                onClick={() => {
                    if (!editMode) {
                        setValue(oldValue);
                        setEditMode(true);
                    }
                }}
                className={cn(
                    "relative",
                    !editMode
                        ? "hover:cursor-text hover:bg-muted-foreground/20 "
                        : ""
                )}
            >
                <div
                    className={cn(
                        !editMode ? "" : "bg-opacity-0 opacity-0 hidden"
                    )}
                >
                    {children}
                </div>
                {!editMode || (
                    <div className="inline-flex gap-2 items-center">
                        <input
                            className={cn("w-full border px-2", className)}
                            defaultValue={_value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                        />
                        <Button
                            onClick={() => {
                                setEditMode(null);
                            }}
                            variant="destructive"
                            className="size-5 p-0"
                        >
                            <Icons.X className="size-3" />
                        </Button>
                        <Button
                            onClick={update}
                            variant="destructive"
                            className="size-5 bg-green-500 hover:bg-green-600 p-0"
                        >
                            <Icons.check className="size-3" />
                        </Button>
                    </div>
                )}
            </span>
        </div>
    );
}
