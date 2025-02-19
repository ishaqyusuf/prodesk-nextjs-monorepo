"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

import { resetPasswordSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { InstallCostMeta, InstallCostSettings } from "@/types/settings";
import PageHeader from "@/components/_v1/page-header";
import { Input } from "@/components/ui/input";
import { Delete, Move, Plus, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import Btn from "@/components/_v1/btn";
import { saveSettingAction } from "@/app/(v1)/_actions/settings";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { generateRandomString } from "@/lib/utils";

export type ResetPasswordFormInputs = z.infer<typeof resetPasswordSchema>;

export function InstallCostForm({ data }: { data: InstallCostSettings }) {
    const router = useRouter();
    const [isPending, startTransition] = React.useTransition();

    // react-hook-form
    const form = useForm<InstallCostMeta>({
        defaultValues: {
            ...(data.meta as any),
        },
    });
    const { watch, control } = form;
    const { fields, replace, remove, append } = useFieldArray({
        control,
        name: "list",
    });

    function onSubmit() {
        startTransition(async () => {
            try {
                const resp = await saveSettingAction(data.id, {
                    meta: {
                        ...((data?.meta || {}) as any),
                        list: form.getValues("list")?.map((list) => {
                            list.uid = list.uid || generateRandomString(4);
                            return list;
                        }),
                    },
                });
                toast.success("Saved.");
            } catch (err: any) {
                toast.error(err.message);
            }
        });
    }
    const handleOndragEnd = (result) => {
        if (!result.destination) return;
        const items = Array.from(fields);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem as any);
        replace(items);
    };
    return (
        <Form {...form}>
            <div className="space-y-4">
                <PageHeader
                    title="Install Cost Price"
                    Action={() => (
                        <>
                            <Btn
                                className="h-8"
                                isLoading={isPending}
                                onClick={onSubmit}
                            >
                                Save
                            </Btn>
                        </>
                    )}
                />
                <div className="mx-w-lg">
                    <DragDropContext onDragEnd={handleOndragEnd}>
                        <Droppable droppableId="droppable-1">
                            {(provided) => {
                                return (
                                    <ul
                                        role="list"
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        <div className="grid grid-cols-12 w-full">
                                            <div className="col-span-6 p-0.5 border bg-slate-200 px-2">
                                                <Label>Task</Label>
                                            </div>
                                            <div className="col-span-2 p-0.5 border bg-slate-200 px-2">
                                                <Label>Cost</Label>
                                            </div>
                                            <div className="col-span-1 p-0.5 border bg-slate-200 px-2">
                                                <Label>Max Qty</Label>
                                            </div>
                                            {/* <div className="col-span-1 p-0.5 border bg-slate-200 px-2">
                                                <Label>Contractor</Label>
                                            </div> */}
                                            <div className="col-span-1 p-0.5 border bg-slate-200 px-2">
                                                <Label>Punchout</Label>
                                            </div>
                                            <div className="col-span-1 p-0.5 border bg-slate-200 px-2"></div>
                                        </div>
                                        {fields.map((field, rowIndex) => (
                                            <Draggable
                                                key={rowIndex}
                                                draggableId={field.id}
                                                index={rowIndex}
                                            >
                                                {(provided) => {
                                                    return (
                                                        <div
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            key={field.id}
                                                            className="grid grid-cols-12 w-full items-center rounded  group"
                                                        >
                                                            <div className="col-span-6 border">
                                                                <CostInput
                                                                    form={form}
                                                                    formKey={`list.${rowIndex}.title`}
                                                                />
                                                            </div>
                                                            <div className="col-span-2 border">
                                                                <CostInput
                                                                    type="number"
                                                                    form={form}
                                                                    formKey={`list.${rowIndex}.cost`}
                                                                />
                                                            </div>
                                                            <div className="col-span-1 border">
                                                                <CostInput
                                                                    type="number"
                                                                    form={form}
                                                                    formKey={`list.${rowIndex}.defaultQty`}
                                                                />
                                                            </div>
                                                            {[
                                                                // "contractor",
                                                                "punchout",
                                                            ].map((k) => (
                                                                <div
                                                                    key={k}
                                                                    className="col-span-1 flex justify-center border h-7"
                                                                >
                                                                    <FormField
                                                                        control={
                                                                            form.control
                                                                        }
                                                                        name={
                                                                            `list.${rowIndex}.${k}` as any
                                                                        }
                                                                        render={({
                                                                            field,
                                                                        }) => (
                                                                            <FormItem className="space-x-2 space-y-0 flex items-center">
                                                                                <FormControl>
                                                                                    <Checkbox
                                                                                        checked={
                                                                                            field.value as any
                                                                                        }
                                                                                        onCheckedChange={
                                                                                            field.onChange
                                                                                        }
                                                                                    />
                                                                                </FormControl>
                                                                            </FormItem>
                                                                        )}
                                                                    />
                                                                </div>
                                                            ))}

                                                            <div className="col-span-1 space-x-2  border h-7 flex items-center">
                                                                <Move className="size-4 mx-2 text-slate-300 group-hover:text-gray-600" />
                                                                <Button
                                                                    onClick={() => {
                                                                        remove(
                                                                            rowIndex
                                                                        );
                                                                    }}
                                                                    size="icon"
                                                                    variant="ghost"
                                                                >
                                                                    <Trash className="h-4 w-4 text-slate-300 group-hover:text-red-600" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    );
                                                }}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                );
                            }}
                        </Droppable>
                    </DragDropContext>
                    <Button
                        onClick={() => {
                            append({} as any);
                        }}
                        variant="secondary"
                        className="w-full h-7 mt-1"
                    >
                        <Plus className="mr-2 size-4" />
                        <span>Add Line</span>
                    </Button>
                </div>
            </div>
        </Form>
    );
}
function CostInput({
    form,
    formKey,
    type = "text",
}: {
    form: any;
    formKey;
    type?;
}) {
    //   const q = form.watch(formKey)
    //   const debouncedQuery = useDebounce(q, 800);
    //   const [watcher,startWatcher] = React.useState(false)
    // React.useEffect(() => {
    //   if(watcher) {

    //   }
    //   console.log(l1)
    // },[debouncedQuery,watcher])

    return (
        <Input
            className="h-7 border-transparent uppercase"
            type={type}
            {...form.register(formKey)}
        />
    );
}
