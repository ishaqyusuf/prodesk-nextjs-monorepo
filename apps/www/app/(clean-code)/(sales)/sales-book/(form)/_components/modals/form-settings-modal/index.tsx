import Modal from "@/components/common/modal";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/_v1/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Context, useSettings, useSettingsContext } from "./ctx";
import { useFieldArray } from "react-hook-form";
import {
    Sortable,
    SortableDragHandle,
    SortableItem,
} from "@/components/ui/sortable";

import { DragHandleDots2Icon } from "@radix-ui/react-icons";
import ConfirmBtn from "@/components/_v1/confirm-btn";
import FormSelect from "@/components/common/controls/form-select";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import FormCheckbox from "@/components/common/controls/form-checkbox";
import { Menu } from "@/components/(clean-code)/menu";
import { useEffect } from "react";

export default function FormSettingsModal({}) {
    const value = useSettingsContext();
    const { arr, salesSetting, createSection } = value;
    return (
        <Form {...value.form}>
            <Context.Provider value={value}>
                <Modal.Content>
                    <Modal.Header
                        title={"Form Step Sequence"}
                        subtitle={
                            "Configure form step sequence for each item section"
                        }
                    />
                    <ScrollArea className="h-[90vh]   overflow-auto -mx-6 px-6 flex-col  gap-4">
                        <div className="pb-16 gap-4 flex flex-col">
                            {arr.fields.map((k) => (
                                <RouteSection key={k._id} uid={k.uid} />
                            ))}
                            <div className="flex justify-end"></div>
                        </div>
                    </ScrollArea>
                    <div className="absolute bg-white border-t shadow-lg w-full z-[9999] bottom-0 right-0 p-4">
                        <Modal.Footer submitText="Save" onSubmit={value.save}>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild className="flex">
                                    <Button
                                        variant="outline"
                                        className="items-center justify-center gap-2"
                                    >
                                        <Icons.add className="w-h h-4" />
                                        <span>Section</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="">
                                    {salesSetting.rootStep?.stepProducts?.map(
                                        (stepProd) => (
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    createSection(stepProd.uid)
                                                }
                                                disabled={arr.fields.some(
                                                    (s) => s.uid == stepProd.uid
                                                )}
                                                className="uppercase"
                                                key={stepProd.uid}
                                            >
                                                {stepProd.product?.title}
                                            </DropdownMenuItem>
                                        )
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Modal.Footer>
                    </div>
                </Modal.Content>
            </Context.Provider>
        </Form>
    );
}
function RouteSection({ uid }) {
    const ctx = useSettings();
    const arr = useFieldArray({
        control: ctx.form.control,
        name: `data.setting.data.route.${uid}.routeSequence`,
        // keyName: "_id",
    });

    return (
        <Card className="">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
                <CardHeader className="w-full flex-col gap-4 space-y-0 sm:flex-row">
                    <div className="flex flex-1 flex-col gap-1.5">
                        <CardTitle>
                            {
                                ctx.salesSetting?.rootComponentsByKey?.[uid]
                                    ?.title
                            }
                        </CardTitle>
                        <CardDescription>Compose Step Sequence</CardDescription>
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-fit"
                        onClick={() => arr.append({ uid: "" })}
                    >
                        <Icons.add className="size-4" />
                        <span>Step</span>
                    </Button>
                </CardHeader>
            </div>
            <CardContent>
                <div className="grid gap-4 pb-4">
                    <FormCheckbox
                        switchInput
                        control={ctx.form.control}
                        name={`data.setting.data.route.${uid}.config.noHandle`}
                        label="Single Handle Mode"
                        description="Turn on if this section does not have the Lh and Rh attribute"
                    />
                    <FormCheckbox
                        switchInput
                        control={ctx.form.control}
                        name={`data.setting.data.route.${uid}.config.hasSwing`}
                        label="Swing Input"
                        description="Turn on if this section does not have swing attribute"
                    />
                </div>
                <div className="">
                    <div className="grid gap-4 grid-cols-2 pb-4">
                        <FormCheckbox
                            switchInput
                            control={ctx.form.control}
                            name={`data.setting.data.route.${uid}.config.production`}
                            label="Activate Production"
                        />
                        <FormCheckbox
                            switchInput
                            control={ctx.form.control}
                            name={`data.setting.data.route.${uid}.config.shipping`}
                            label="Activate Shipping"
                        />
                    </div>
                </div>
                <Sortable
                    value={arr.fields}
                    onMove={({ activeIndex, overIndex }) =>
                        arr.move(activeIndex, overIndex)
                    }
                    overlay={
                        <div className="grid grid-cols-[1fr,auto,auto] items-center gap-2">
                            {/* <div className="h-8 w-full rounded-sm bg-primary/10" /> */}
                            <div className="h-8 w-full rounded-sm bg-primary/10" />
                            <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                            <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                        </div>
                    }
                >
                    <div className="flex w-full flex-col gap-2">
                        {arr.fields.map((field, index) => (
                            <SortableItem
                                key={field.id}
                                value={field.id}
                                asChild
                            >
                                <div className="grid grid-cols-[1fr,auto,auto] items-center gap-2">
                                    {/* <div>{index}</div> */}
                                    <FormSelect
                                        size="sm"
                                        name={`data.setting.data.route.${uid}.routeSequence.${index}.uid`}
                                        titleKey="title"
                                        valueKey="uid"
                                        options={ctx.steps}
                                        control={ctx.form.control}
                                    />

                                    <SortableDragHandle
                                        variant="outline"
                                        size="icon"
                                        className="size-4 shrink-0"
                                    >
                                        <DragHandleDots2Icon
                                            className="size-4"
                                            aria-hidden="true"
                                        />
                                    </SortableDragHandle>
                                    <ConfirmBtn
                                        onClick={() => {
                                            arr.remove(index);
                                        }}
                                        trash
                                        size="icon"
                                    />
                                </div>
                            </SortableItem>
                        ))}
                    </div>
                </Sortable>
                <div className="flex justify-end mt-4">
                    <Button
                        onClick={() => {
                            arr.append({ uid: "" });
                        }}
                        variant="secondary"
                        size="sm"
                    >
                        <Icons.add className="size-4" />
                        <span>Step</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
