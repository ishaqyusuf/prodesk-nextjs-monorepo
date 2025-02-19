"use client";

import { Button } from "@/components/ui/button";
import { checkSalesItems } from "./action";

export default function DebugSaveError() {
    return (
        <>
            <Button
                onClick={async (e) => {
                    console.log(await checkSalesItems());
                }}
            >
                Debug
            </Button>
        </>
    );
}
