"use client";

import { Icons } from "@/components/_v1/icons";
import { Button } from "@/components/ui/button";
import { useHomeModal } from "./home-modal";

export default function AddHomeBtn() {
    const modal = useHomeModal();
    return (
        <>
            <Button
                onClick={() => {
                    modal.open();
                }}
                size="sm"
            >
                <Icons.add className="size-4 mr-2" />
                <span>Add</span>
            </Button>
        </>
    );
}
