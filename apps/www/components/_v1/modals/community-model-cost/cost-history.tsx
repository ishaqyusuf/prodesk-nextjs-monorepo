"use client";

import { _getModelCostStat } from "@/app/(v1)/_actions/community/_model-cost-stat";
import { useFieldArray } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import ConfirmBtn from "@/components/_v1/confirm-btn";
import { cn } from "@/lib/utils";
import {
    _deleteCommunityModelCost,
    _saveCommunitModelCostData,
} from "@/app/(v1)/_actions/community/community-model-cost";
import { toast } from "sonner";
import { _getCommunityModelCostUnits } from "@/app/(v1)/_actions/community/community-model-cost-units";
import Money from "@/components/_v1/money";
import { ModelCostProps } from "./modal";

export function CommunityCostHistory({
    form,
    data,
    watchIndex,
}: ModelCostProps) {
    const { prepend, remove, fields } = useFieldArray({
        control: form.control,
        name: "costs",
    });
    function createCost() {
        if (fields?.some((c) => !c.createdAt)) {
            toast.error("You have unsaved costs");
        } else
            prepend({
                type: "task-costs",
                model: data?.modelName,
            } as any);
        form.setValue("index", 0);
    }
    return (
        <div className="sm:w-2/5 space-y-2 pr-2">
            <div className="">
                <Label>Cost History</Label>
            </div>
            <div className="">
                <Button
                    onClick={createCost}
                    variant="outline"
                    className="w-full h-7 mt-1"
                >
                    <Plus className="mr-2 size-4" />
                    <span>New Cost</span>
                </Button>
            </div>
            <ScrollArea className="max-h-[350px] h-[350px] w-full">
                <div className="divide-y">
                    {fields.map((f, i) => (
                        <div
                            className="flex items-center space-x-2 group mr-2"
                            key={i}
                        >
                            <Button
                                variant={
                                    i == watchIndex ? "secondary" : "ghost"
                                }
                                className="text-sm cursor-pointer hover:bg-slate-200 h-auto w-full flex  py-2 px-2"
                                onClick={() => {
                                    if (watchIndex != i)
                                        form.setValue("index", i);
                                }}
                            >
                                <div className="flex justify-between items-center flex-1 space-x-4">
                                    <div className="flex flex-col items-start">
                                        <div className="text-start text-muted-foreground">
                                            {f.title || "New Cost"}
                                        </div>
                                        <div>
                                            <Money
                                                value={f?.meta?.grandTotal}
                                            ></Money>
                                        </div>
                                    </div>
                                    <div>
                                        <Badge className="" variant={"outline"}>
                                            {form.getValues(`stats.${f._id}`) ||
                                                0}
                                        </Badge>
                                    </div>
                                </div>
                            </Button>
                            <ConfirmBtn
                                onClick={async () => {
                                    if (watchIndex == i && fields.length > 1) {
                                        if (
                                            watchIndex > 0 &&
                                            fields.length - 1 == watchIndex
                                        )
                                            form.setValue("index", i + 1);
                                        //    changeIndex(i - 1);
                                    }
                                    if (fields.length == 1) createCost();
                                    await _deleteCommunityModelCost(f._id);
                                    remove(i);

                                    // changeIndex()
                                }}
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "group-hover:opacity-100 opacity-20"
                                )}
                                trash
                            ></ConfirmBtn>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}
