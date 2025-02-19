import { Icons } from "@/components/_v1/icons";
import Button from "@/components/common/button";
import { useSalesOverview } from "../overview-provider";

export function PayAction({}) {
    const ctx = useSalesOverview();

    const payCtx = ctx.payCtx;

    if (ctx.item.type == "quote") return null;
    return (
        <Button
            disabled={!ctx.item.due || payCtx.paymentMethod != null}
            onClick={() => {
                payCtx.form.setValue("paymentMethod", "terminal");
                payCtx.form.setValue("amount", ctx.item.due);
            }}
        >
            <Icons.dollar className="size-4" />
            <span>{`Pay $${ctx.item.due}`}</span>
        </Button>
    );
}
