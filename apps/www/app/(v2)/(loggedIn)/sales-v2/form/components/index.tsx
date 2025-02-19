"use client";

import RenderForm from "@/_v2/components/common/render-form";
import { Button } from "@/components/ui/button";
import { addDoorUnitAction } from "../_action/add-door-unit";
import SalesMetaData from "./sales-meta-data";
import HeaderSection from "./dyke-sales-header-section";
import SalesAddressSection from "../../../sales/edit/components/sales-address-section";
import { Icons } from "@/components/_v1/icons";
import DykeSalesFooterSection from "./dyke-sales-footer-section";
import { DykeInvoiceItemSection } from "./item-section/item-section";
import {
    LegacyDykeFormContext,
    useLegacyDykeFormContext,
} from "@/app/(clean-code)/(sales)/sales-book/(form)/_hooks/legacy-hooks";
import { useEffect } from "react";

interface Props {
    defaultValues: any;
}
export default function SalesFormComponent({ defaultValues }: Props) {
    const ctx = useLegacyDykeFormContext(defaultValues);
    const { form, dealerMode, itemArray } = ctx;
    useEffect(() => {
        console.log({ defaultValues });
    }, []);

    return (
        <LegacyDykeFormContext.Provider value={ctx}>
            <RenderForm {...form}>
                <HeaderSection />
                <section
                    id="detailsSection"
                    className="border-y my-2 py-1 grid gap-4 md:grid-cols-2 xl:grid-cols-5 gap-x-8"
                >
                    {!dealerMode && <SalesMetaData />}
                    <SalesAddressSection />
                </section>
                {itemArray.fields.map((field, index) => (
                    <DykeInvoiceItemSection key={field.id} rowIndex={index} />
                ))}
                <div className="flex justify-end space-x-2 mt-2">
                    <Button
                        className=""
                        onClick={async () => {
                            const doorUnit = await addDoorUnitAction();
                            itemArray.append(doorUnit as any);
                        }}
                    >
                        <Icons.add className="size-4 mr-2" />
                        <span>Add Item</span>
                    </Button>
                </div>
                <DykeSalesFooterSection />
            </RenderForm>
        </LegacyDykeFormContext.Provider>
    );
}
