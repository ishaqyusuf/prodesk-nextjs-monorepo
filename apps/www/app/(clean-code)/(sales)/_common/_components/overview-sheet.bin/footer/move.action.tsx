import { SalesType } from "@/app/(clean-code)/(sales)/types";
import { useSalesOverview } from "../overview-provider";
import { Menu } from "@/components/(clean-code)/menu";
import { Move } from "lucide-react";
import { moveOrderUseCase } from "../../../use-case/sales-book-form-use-case";
import { toast } from "sonner";

export function MoveAction({}) {
    const ctx = useSalesOverview();
    const type = ctx.item.type;
    const isDyke = ctx.item.isDyke;
    async function _moveSales() {
        const to = type == "order" ? "quote" : "order";

        const resp = await moveOrderUseCase(ctx.item.orderId, to);
        if (resp.link && !resp.error) {
        } else {
            console.log(resp.error);
            console.log(resp.data);
            return;
        }

        toast.success(`Moved to ${to}`, {});
        ctx.refreshList();
        ctx.closeModal();
        toast.success("Success");
    }
    return (
        <Menu.Item onClick={_moveSales} Icon={Move}>
            {type == "order" ? "Move to Quote" : "Move to Sales"}
        </Menu.Item>
    );
}
