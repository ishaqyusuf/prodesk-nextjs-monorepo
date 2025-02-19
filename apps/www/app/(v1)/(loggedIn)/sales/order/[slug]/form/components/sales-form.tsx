"use client";
import { SalesFormResponse } from "@/app/(v1)/(loggedIn)/sales/_actions/sales-form";
import { ISalesOrder } from "@/types/sales";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { PrintOrderMenuAction } from "@/components/_v1/actions/sales-menu-actions";
import OrderPrinter from "@/components/_v1/print/order/order-printer";
import { useCallback, useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import { saveOrderAction } from "@/app/(v1)/(loggedIn)/sales/_actions/sales";
import { useRouter } from "next/navigation";

import { SalesCustomerModal } from "@/components/_v1/modals/sales-address-modal";
import SalesInvoiceTable from "./sales-invoice-table";
import { store, useAppSelector } from "@/store";

import InfoCard from "./sales-info-address-form";
import { Switch } from "@/components/ui/switch";
import {
    resetFooterInfo,
    toggleMockup,
} from "@/store/invoice-item-component-slice";
import { Label } from "@/components/ui/label";
import {
    Menu,
    MenuItem,
} from "@/components/_v1/data-table/data-table-row-actions";
import { Icons } from "@/components/_v1/icons";
import { openModal } from "@/lib/modal";
import UpdateSalesDate from "@/components/_v1/sales/update-sales-date";
import salesUtils from "../sales-utils";
import debounce from "debounce";
import useDeepCompareEffect from "use-deep-compare-effect";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { isProdClient } from "@/lib/is-prod";
import RenderForm from "@/_v2/components/common/render-form";
import { useDataPage } from "@/lib/data-page-context";
import { SaveMode } from "@/app/(v2)/(loggedIn)/sales-v2/type";

interface Props {
    data: SalesFormResponse;
    newTitle;
    slug;
}
let renderCount = 0;
export default function SalesForm({ data, newTitle, slug }: Props) {
    const { data: pageData } = useDataPage<SalesFormResponse>();
    const defaultValues: ISalesOrder = {
        ...data?.form,
    };
    //old payment term
    const opTerm = data?.form?.paymentTerm;
    const form = useForm<ISalesOrder>({
        defaultValues,
    });
    const watchForm = useWatch({
        control: form.control,
        defaultValue: defaultValues,
    });
    const debouncedSave = useCallback(
        debounce(() => {
            form.handleSubmit((d) => {
                if (d.customerId) {
                    console.log("Saving");
                    onSubmit(d, "default", true);
                } else {
                    console.log("no customer id.... not saving");
                    toast.error(
                        "Autosave paused, requires customer information."
                    );
                }
            })();
            // methods.handleSubmit(onSubmit)();
        }, 5000),
        [form]
    );
    useDeepCompareEffect(() => {
        // console.log(watchForm.items?.[2]?.description);
        if (
            form.formState.isDirty &&
            Object.keys(form.formState.dirtyFields).length
        ) {
            // console.log(form.formState.dirtyFields);
            debouncedSave();
        }
    }, [watchForm, form]);
    const router = useRouter();
    //wake up
    useEffect(() => {
        // console.log("...");
    }, []);
    // useEffect(() => {
    //     return routeLeaveHandler.link(router);
    // }, []);
    // const router = useRouter();
    // const handleClick = e => {
    //     console.log("REQ");
    //     e.preventDefault();
    // };
    // useEffect(() => {
    //     document.addEventListener("click", handleClick, { capture: true });

    //     return () =>
    //         document.removeEventListener("click", handleClick, {
    //             capture: true
    //         });
    // }, [, /* ... deps from Redux */ handleClick]);
    useEffect(() => {
        // console.log("chnaged");
        let resp = data;

        const _formData: any = resp?.form || { meta: {} };
        const { _items, footer } = salesUtils.initInvoiceItems(
            resp?.form?.items
        );

        store.dispatch(resetFooterInfo(footer));
        form.reset({
            ..._formData,
            items: _items,
        });
    }, [data]);

    const watchOrderId = form.watch("orderId");
    const [isSaving, startTransition] = useTransition();

    async function save(and: SaveMode = "default") {
        // form.handleSubmit
        form.handleSubmit((data) => onSubmit(data, and))();
    }
    async function onSubmit(data, and: SaveMode = "default", autoSave = false) {
        // console.log("SAVING....");
        // return;
        try {
            startTransition(async () => {
                const formData = salesUtils.formData(data, pageData.paidAmount);
                formData.autoSave = autoSave;
                // console.log(formData);
                const { paymentTerm, goodUntil } = formData.order;
                // if (formData.order.type == "order") {
                // }
                // return;
                // try {
                const response = await saveOrderAction(formData);
                // return;
                if (response.orderId) {
                    const type = response.type;
                    if (and == "close") router.push(`/sales/${type}s`);
                    else {
                        if (and == "new")
                            router.push(`/sales-book/create-${type}`);
                        else {
                            if (slug != response.orderId)
                                router.push(
                                    `/sales/${type}/${response.orderId}/form`
                                );
                            else {
                                // form.reset(data);
                                // form.clearErrors()
                            }
                        }
                    }
                }
                if (!autoSave || (autoSave && !isProdClient)) {
                    toast.success("Saved");
                }
                form.reset(
                    {},
                    {
                        keepValues: true,
                        keepDirty: false,
                        keepSubmitCount: true,
                    }
                );
            });
        } catch (error) {
            console.log(error);
        }
        //  loader.action(async () => {
        //  });
    }

    const mockupMode = useAppSelector(
        (state) => state.orderItemComponent?.showMockup
    );
    const mockPercent = form.watch("meta.mockupPercentage");

    return (
        <FormProvider {...form}>
            <RenderForm {...form}>
                <form
                    // onSubmit={form.handleSubmit((data) => onSubmit(data, "abc"))}
                    className="px-8"
                >
                    <OrderPrinter />
                    {/* <AutoExpandInput /> */}
                    <section
                        id="header"
                        className="flex items-center justify-between"
                    >
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">
                                {watchOrderId || newTitle}
                            </h2>
                        </div>
                        <div className="flex-1 px-4">
                            <Button asChild variant={"destructive"} size="sm">
                                <Link
                                    href={`/sales/edit/${data.form.type}/${data.form.slug}`}
                                >
                                    {/* <Icons.Rocket /> */}
                                    Switch to V2
                                </Link>
                            </Button>
                        </div>
                        <div className="sitems-center flex space-x-2">
                            {(mockPercent || 0) > 0 && (
                                <div className="inline-flex items-center space-x-2">
                                    <Label>Mockup Mode</Label>
                                    <Switch
                                        checked={mockupMode as any}
                                        onCheckedChange={(e) => {
                                            store.dispatch(toggleMockup(e));
                                        }}
                                    />
                                </div>
                            )}
                            <UpdateSalesDate form={form} />
                            <Menu
                                variant={"secondary"}
                                disabled={mockupMode}
                                label={"Save"}
                                Icon={null}
                            >
                                <MenuItem
                                    onClick={() => save()}
                                    Icon={Icons.save}
                                >
                                    Save
                                </MenuItem>
                                <MenuItem
                                    onClick={() => save("close")}
                                    Icon={Icons.saveAndClose}
                                >
                                    Save & Close
                                </MenuItem>
                                <MenuItem
                                    onClick={() => save("new")}
                                    Icon={Icons.add}
                                >
                                    Save & New
                                </MenuItem>
                            </Menu>
                            <Menu Icon={Icons.more}>
                                <MenuItem
                                    onClick={() => {
                                        openModal("salesSupply");
                                    }}
                                >
                                    Supply
                                </MenuItem>
                                <PrintOrderMenuAction
                                    link
                                    row={{ id: form.getValues("id") } as any}
                                />
                                <PrintOrderMenuAction
                                    mockup
                                    link
                                    row={{ id: form.getValues("id") } as any}
                                />
                                <PrintOrderMenuAction
                                    pdf
                                    row={{ id: form.getValues("id") } as any}
                                />
                            </Menu>
                        </div>
                    </section>
                    <section
                        id="topForm"
                        className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-5 gap-x-8"
                    >
                        <div className="xl:col-span-3">
                            <InfoCard data={data} form={form} />
                        </div>
                        <div className="xl:col-span-2">
                            <SalesCustomerModal
                                form={form}
                                profiles={data.ctx?.profiles}
                            />
                        </div>
                    </section>
                    <section id="invoiceForm">
                        <SalesInvoiceTable form={form} data={data} />
                    </section>
                </form>
            </RenderForm>
        </FormProvider>
    );
}

function AutoExpandInput() {
    const [text, setText] = useState("");
    const [lineCount, setLineCount] = useState(1);
    useEffect(() => {
        const textarea: HTMLElement = document.querySelector(
            ".auto-expand-input"
        ) as any;
        if (!textarea) return;
        const adjustHeight = () => {
            textarea.style.height = "32px";
            if (textarea.scrollHeight > 50) {
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
            // console.log(textarea.scrollHeight);
        };

        textarea.addEventListener("input", adjustHeight);
        return () => {
            textarea.removeEventListener("input", adjustHeight);
        };
    }, []);
    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        const newLineCount = newText.split("\n").length;
        setLineCount(newLineCount);
    };
    return (
        <div className="relative w-full">
            <textarea
                value={text}
                onChange={handleTextChange}
                className="auto-expand-input w-full h-[32px] resize-none overflow-hidden border p-0.5 rounded-md"
                placeholder="Type something..."
            />
            {lineCount}
        </div>
    );
}
