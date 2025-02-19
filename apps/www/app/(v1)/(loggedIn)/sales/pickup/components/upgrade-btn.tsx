"use client";

import { Button } from "@/components/ui/button";
import { upgradeDeliveries } from "../_action/upgrade-deliveries";
import { toast } from "sonner";
import { env } from "@/env.mjs";

export default function UpgradeBtn() {
    if (env.NEXT_PUBLIC_NODE_ENV === "production") return null;
    return (
        <div>
            <Button
                onClick={() => {
                    // upgradeDeliveries().then((d) => {
                    //     toast.success("Done!");
                    //     console.log(d);
                    // });
                }}
            >
                Upgrade
            </Button>
        </div>
    );
}
