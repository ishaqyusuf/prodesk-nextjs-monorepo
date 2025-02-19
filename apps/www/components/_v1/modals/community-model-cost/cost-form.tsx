"use client";

import { _getModelCostStat } from "@/app/(v1)/_actions/community/_model-cost-stat";
import { deepCopy } from "@/lib/deep-copy";
import { ICommunityCosts } from "@/types/community";
import { useEffect, useState, useTransition } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Label } from "@/components/ui/label";

import {
    _deleteCommunityModelCost,
    _saveCommunitModelCostData,
} from "@/app/(v1)/_actions/community/community-model-cost";
import { toast } from "sonner";
import { _getCommunityModelCostUnits } from "@/app/(v1)/_actions/community/community-model-cost-units";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import ReRender from "@/components/_v1/re-render";
import { DatePicker } from "@/components/_v1/date-range-picker";
import { Checkbox } from "@/components/ui/checkbox";
import Btn from "@/components/_v1/btn";
import { calculateCommunitModelCost } from "@/lib/community/community-utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModelCostProps } from "./modal";
import CostUnits from "./cost-units";
import Money from "@/components/_v1/money";
import dayjs from "dayjs";

export function CommunityCostForm({ form, data, watchIndex }: ModelCostProps) {
    // const index = form.watch("index");
    const { prepend, remove, fields } = useFieldArray({
        control: form.control,
        name: "costs",
    });
    const template = form.watch("template");
    const costForm = useForm<ICommunityCosts>({});
    const watchCosts = costForm.watch();
    useEffect(() => {
        const { id, _id, ...c } = deepCopy(fields[watchIndex] || {}) as any;
        if (c.startDate) c.startDate = new Date(c.startDate);
        if (c.endDate) c.endDate = new Date(c.endDate);
        startTransition2(() => {
            costForm.reset({
                ...c,
                id: _id,
            });
        });
    }, [watchIndex, fields, costForm]);
    const [_cost, _setCost] = useState<ICommunityCosts>({} as any);
    const [totalTax, setTotalTax] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    useEffect(() => {
        if (!data) return;
        let _ = deepCopy<ICommunityCosts>(watchCosts);
        // console.log(_);
        const meta = calculateCommunitModelCost(
            _.meta,
            data?.project?.builder?.meta?.tasks
        );
        // _setCost(_);
        setTotalTax(meta?.totalTax);
        setTotalCost(meta?.totalCost);
    }, [watchCosts]);
    async function initialize(costId) {
        console.log(costId);
    }
    const [isSaving, startTransition] = useTransition();
    const [refresh, startTransition2] = useTransition();
    async function submit() {
        startTransition(async () => {
            try {
                const cost = deepCopy<ICommunityCosts>(costForm.getValues());
                if (!cost.startDate) {
                    toast.error("Add a valid starting date");
                    return;
                }
                if (!cost.endDate) {
                    const cIndex = fields.findIndex((c) => c._id && !c.endDate);
                    if (cIndex > -1 && cIndex != watchIndex) {
                        toast.error("Only one cost can have empty end date");
                        return;
                    }
                }
                if (
                    cost.endDate &&
                    dayjs(cost.startDate).isAfter(cost.endDate)
                ) {
                    toast.error("Invalid date bound. End date Must be ahead.");
                    return;
                }
                cost.meta = calculateCommunitModelCost(
                    cost.meta,
                    data.project?.builder?.meta?.tasks
                ) as any;
                cost.model = data.modelName;

                const { _id, community, ..._cost } = cost as any;

                const c = await _saveCommunitModelCostData(
                    _cost as any,
                    data.id,
                    data.pivotId
                );
                toast.success("Saved!");

                form.setValue(`costs.${watchIndex}` as any, {
                    ...c,
                    _id,
                });
            } catch (error) {
                toast.message("Invalid Form");
                return;
            }
        });
    }
    // const [startDate, endDate] = costForm.watch("startDate", "endDate");
    return (
        <Form {...costForm}>
            <Tabs defaultValue="costs" className="space-y-4 flex-1">
                <TabsList className="">
                    <TabsTrigger value="costs">Task Costs</TabsTrigger>
                    <TabsTrigger value="units">Units</TabsTrigger>
                </TabsList>
                <TabsContent value="costs" className="space-y-4">
                    {
                        <>
                            <ReRender form={costForm}></ReRender>
                            <div className="grid flex-1 grid-cols-4  pl-2 gap-2">
                                {
                                    <>
                                        <div className="col-span-2 grid gap-2">
                                            <Label>From</Label>
                                            <DatePicker
                                                className="w-auto h-8"
                                                setValue={(e) =>
                                                    costForm.setValue(
                                                        `startDate`,
                                                        e
                                                    )
                                                }
                                                value={watchCosts.startDate}
                                            />
                                        </div>
                                        <div className="col-span-2 grid gap-2">
                                            <Label>To</Label>
                                            <DatePicker
                                                className="w-auto h-8"
                                                setValue={(e) =>
                                                    costForm.setValue(
                                                        `endDate`,
                                                        e
                                                    )
                                                }
                                                value={watchCosts.endDate}
                                            />
                                        </div>
                                    </>
                                }
                                <div className="col-span-5 grid-cols-7 grid bg-slate-100 py-2">
                                    <Label className="col-span-3 mx-2">
                                        Tasks
                                    </Label>
                                    <Label className="col-span-2">
                                        Cost ($)
                                    </Label>
                                    <Label className="col-span-2">
                                        Tax ($)
                                    </Label>
                                </div>
                                {data?.project?.builder?.meta?.tasks?.map(
                                    (t, _i) => (
                                        <div
                                            key={_i}
                                            className="col-span-4 gap-2 grid-cols-7 grid"
                                        >
                                            <div className="col-span-3">
                                                <Label>{t.name}</Label>
                                            </div>
                                            <div className="col-span-2">
                                                <Input
                                                    type="number"
                                                    key="cost"
                                                    className="h-8"
                                                    {...costForm.register(
                                                        `meta.costs.${t.uid}`
                                                    )}
                                                />
                                            </div>
                                            <div className="col-span-2">
                                                <Input
                                                    type="number"
                                                    className="h-8"
                                                    {...costForm.register(
                                                        `meta.tax.${t.uid}`
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )
                                )}
                                <div className="col-span-5 grid-cols-7 grid">
                                    <div className="col-span-3"></div>
                                    <div className="col-span-4 flex flex-col font-bold text-muted-foreground">
                                        {/* <div className="flex   text-sm p-2">
                                            <Money
                                                className="flex-1"
                                                value={totalCost}
                                            />
                                            <Money
                                                className="flex-1"
                                                value={totalTax}
                                            />
                                        </div> */}
                                        <div className="p-2 bg-slate-50 flex justify-end border-t">
                                            <Money
                                                value={totalTax + totalCost}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4 border-t pt-2 my-3 flex space-x-4">
                                    {/* <FormField
                                        control={costForm.control}
                                        name={"meta.syncCompletedTasks"}
                                        render={({ field }) => (
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
                                                <FormLabel>
                                                    Update Completed Tasks
                                                </FormLabel>
                                            </FormItem>
                                        )}
                                    /> */}
                                    <div className="flex-1"></div>
                                    <Btn
                                        className="h-8"
                                        isLoading={isSaving}
                                        onClick={() => submit()}
                                        size="sm"
                                        type="submit"
                                    >
                                        Save
                                    </Btn>
                                </div>
                            </div>
                        </>
                    }
                </TabsContent>
                <TabsContent value="units" className="space-y-4">
                    <CostUnits
                        cost={watchCosts}
                        model={form.getValues("template") as any}
                    />
                </TabsContent>
            </Tabs>
        </Form>
    );
}
