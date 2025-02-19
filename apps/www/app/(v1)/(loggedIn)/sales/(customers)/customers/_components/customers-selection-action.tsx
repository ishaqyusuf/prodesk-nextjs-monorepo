"use client";

import { toast } from "sonner";
import Btn from "../../../../../../../components/_v1/btn";
import { Icons } from "../../../../../../../components/_v1/icons";
import { mergeCustomersAction } from "../../_actions/merge-customers-action";

export default function CustomersBatchAction({ items }: { items }) {
    async function mergeDuplicates() {
        await mergeCustomersAction(items.map((item) => item.id));
        toast.success("Merge complete");
    }
    return (
        <>
            {items.length > 1 && (
                <Btn onClick={mergeDuplicates} className="h-8">
                    <Icons.Merge className="size-4 mr-2" />
                    Merge
                </Btn>
            )}
        </>
    );
}
