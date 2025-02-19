import { SalesType } from "@/app/(clean-code)/(sales)/types";
import { Menu } from "@/components/(clean-code)/menu";
import { Copy } from "lucide-react";

import { __revalidatePath } from "@/app/(v1)/_actions/_revalidate";
import { _modal } from "@/components/common/modal/provider";
import { toast } from "sonner";
import { salesOverviewStore } from "../store";
import { copySalesUseCase } from "../../../use-case/sales-book-form-use-case";
import { useRouter } from "next/navigation";

export function CopyMenuAction({}) {
    const ctx = salesOverviewStore();
    const type = ctx.overview.type;
    const isDyke = ctx.overview.dyke;
    const route = useRouter();
    async function copyAs(as: SalesType) {
        const orderId = ctx.overview.orderId;
        const result = await copySalesUseCase(orderId, as);

        if (result.link) {
            toast.success(`Copied as ${as}`, {
                // action: {
                //     label: "open",
                //     onClick(event) {
                //         route.push(result.link);
                //     },
                // },
            });
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
