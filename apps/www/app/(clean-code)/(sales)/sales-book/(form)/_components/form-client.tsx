"use client";

import { useEffect } from "react";
import { GetSalesBookForm } from "../../../_common/use-case/sales-book-form-use-case";
import { useFormDataStore } from "../_common/_stores/form-data-store";
import {
    zhAddItem,
    zhInitializeState,
} from "../_utils/helpers/zus/zus-form-helper";
import ItemSection from "./item-section";
import { FormHeader } from "./form-header";
import { Button } from "@/components/ui/button";

import { Icons } from "@/components/_v1/icons";
import { useSticky } from "../_hooks/use-sticky";
import { FormDataPage } from "./data-page";
import { cn } from "@/lib/utils";
import { FormFooter } from "./form-footer";
import { AddressTab } from "./data-page/address-tab";

interface FormClientProps {
    data: GetSalesBookForm;
}

export function FormClient({ data }: FormClientProps) {
    const zus = useFormDataStore();
    useEffect(() => {
        console.log("RAW DATA", data);
        zus.init(zhInitializeState(data));
    }, []);
    const sticky = useSticky((bv, pv, { top, bottom }) => {
        return top < 100;
    });
    if (!zus.formStatus) return <></>;
    return (
        <div className="mb-28">
            <FormHeader sticky={sticky} />
            <div
                ref={sticky.containerRef}
                className={cn(
                    sticky.isFixed && "mt-10 xl:mt-24",
                    "min-h-screen"
                )}
            >
                <div
                    className={cn(
                        zus.currentTab != "info" &&
                            zus.currentTab &&
                            "opacity-0 h-0 z-0 w-0 overflow-hidden",
                        "lg:flex lg:gap-4"
                    )}
                >
                    <div className="w-2/3 hidden lg:block">
                        <AddressTab />
                    </div>
                    <FormDataPage />
                </div>
                <div
                    className={cn(
                        zus.currentTab != "address" &&
                            "opacity-0 h-0 z-0 w-0 overflow-hidden"
                    )}
                >
                    <AddressTab />
                </div>

                <div
                    className={cn(
                        !(zus.currentTab == "invoice") &&
                            "opacity-0 h-0 z-0 w-0 overflow-hidden"
                    )}
                >
                    {zus.sequence?.formItem?.map((uid) => (
                        <ItemSection key={uid} uid={uid} />
                    ))}
                    <div className="flex mt-4 justify-end">
                        <Button
                            onClick={() => {
                                zhAddItem();
                            }}
                        >
                            <Icons.add className="size-4 mr-2" />
                            <span>Add</span>
                        </Button>
                    </div>
                </div>
            </div>
            <FormFooter />
        </div>
    );
}
