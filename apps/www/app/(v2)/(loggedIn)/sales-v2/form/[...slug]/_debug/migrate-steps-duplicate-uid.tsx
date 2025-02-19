"use client";

import { Button } from "@/components/ui/button";
import { stepUpdateDebug } from "./debug-steps";
import { useEffect } from "react";

export default function MigrateStepDuplicateUid({ data = null }) {
    useEffect(() => {}, []);
    return (
        <>
            <Button
                onClick={async () => {
                    const resp = await stepUpdateDebug();
                    console.log(resp);
                }}
            >
                Step UID
            </Button>
        </>
    );
}
