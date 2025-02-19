import { useContext } from "react";
import { SalesFormContext } from "../ctx";
import { useForm, useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { openModal } from "@/lib/modal";
import { Icons } from "@/components/_v1/icons";
import { ISalesForm } from "../type";
import AddressDisplay from "../../_components/address-display";
import SalesAddressModal from "./sales-address-modal";
import { _modal } from "@/components/common/modal/provider";

export default function SalesAddressSection() {
    const form = useFormContext<ISalesForm>();
    const [shipping, billing, customer, customerId] = form.watch([
        "shippingAddress",
        "billingAddress",
        "customer",
        "customerId",
    ]);
    return (
        <>
            <div
                onClick={() => {
                    _modal?.openModal(<SalesAddressModal form={form} />);
                }}
                className="xl:col-span-2 group cursor-pointer hover:shadow-sm relative  p-2 grid grid-cols-2 rounded-lg dark:hover:bg-accent hover:bg-accent-foreground hover:text-white"
            >
                <div className="absolute right-0 opacity-0 group-hover:opacity-100 ">
                    <Button size="sm" variant="secondary" className="h-8">
                        <Icons.edit className="h-3.5 w-3.5 " />
                    </Button>
                </div>
                <AddressDisplay address={billing} customer={customer} />
                <AddressDisplay
                    address={shipping}
                    type={"shipping"}
                    customer={customer}
                />
            </div>
        </>
    );
}
