import { SalesType } from "@/app/(clean-code)/(sales)/types";
import { Menu } from "@/components/(clean-code)/menu";
import { Copy } from "lucide-react";
import { useSalesOverview } from "../overview-provider";
import { copySalesUseCase } from "../../../use-case/sales-book-form-use-case";
import { copyOrderAction } from "@/app/(v1)/(loggedIn)/sales/_actions/sales";
import { __revalidatePath } from "@/app/(v1)/_actions/_revalidate";
import { _modal } from "@/components/common/modal/provider";
import { toast } from "sonner";

export function CopyAction({}) {
    const ctx = useSalesOverview();
    const isDyke = ctx.item.isDyke;
    async function copyAs(as: SalesType) {
        const orderId = ctx.item.orderId;
        const result = isDyke
            ? await copySalesUseCase(orderId, as)
            : await copyOrderAction({
                  orderId,
                  as,
              });
        if (result.link) {
            // await __revalidatePath(`/sales-book/${as}s`);
            toast.success(`Copied as ${as}`);
        } else {
            //
            console.log(result);
        }
    }
    return (
        <Menu.Item
            Icon={Copy}
            SubMenu={
                <>
                    <Menu.Item onClick={() => copyAs("order")} icon="orders">
                        Order
                    </Menu.Item>
                    <Menu.Item onClick={() => copyAs("quote")} icon="estimates">
                        Quote
                    </Menu.Item>
                </>
            }
        >
            Copy As
        </Menu.Item>
    );
}
