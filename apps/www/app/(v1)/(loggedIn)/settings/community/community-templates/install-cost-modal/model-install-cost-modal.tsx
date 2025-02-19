"use client";

import React, { useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import Btn from "../../../../../../../components/_v1/btn";
import BaseModal from "../../../../../../../components/_v1/modals/base-modal";
import { toast } from "sonner";

import { useFieldArray, useForm } from "react-hook-form";
import { Label } from "../../../../../../../components/ui/label";
import { Input } from "../../../../../../../components/ui/input";
import {
    ICommunityTemplate,
    IHomeTemplate,
    IProject,
    InstallCost,
} from "@/types/community";
import { ScrollArea } from "../../../../../../../components/ui/scroll-area";
import { Button } from "../../../../../../../components/ui/button";
import { Plus } from "lucide-react";
import { deepCopy } from "@/lib/deep-copy";
import {
    InstallCostLine,
    InstallCostMeta,
    InstallCostSettings,
} from "@/types/settings";
import { getSettingAction } from "@/app/(v1)/_actions/settings";
import {
    PrimaryCellContent,
    SecondaryCellContent,
} from "../../../../../../../components/_v1/columns/base-columns";
import Money from "../../../../../../../components/_v1/money";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../../../../components/ui/table";
import { cn } from "@/lib/utils";
import { updateModelInstallCost } from "@/app/(v1)/_actions/community/install-costs";
import { updateCommunityModelInstallCost } from "@/app/(v1)/_actions/community/community-template";
import { Badge } from "../../../../../../../components/ui/badge";
import { Switch } from "../../../../../../../components/ui/switch";
import { FormField } from "../../../../../../../components/ui/form";
import { loadStaticList } from "@/store/slicers";
import { useAppSelector } from "@/store";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getInstallCostsAction } from "@/app/(v1)/_actions/community/install-costs/get-install-costs.action";

export default function ModelInstallCostModal({ community = false }) {
    const route = useRouter();
    const [isSaving, startTransition] = useTransition();
    const form = useForm<{ costs: InstallCost[]; enable: Boolean }>({
        defaultValues: {},
    });
    const { append, fields } = useFieldArray({
        control: form.control,
        name: "costs",
    });

    // const installCostSetting = useAppSelector(
    // (s) => s.slicers.installCostSetting
    // );
    const [costSetting, setCostSetting] = useState<InstallCostSettings>();
    const [index, setIndex] = useState(0);

    async function submit(data) {
        startTransition(async () => {
            // if(!form.getValues)
            try {
                // const isValid = emailSchema.parse(form.getValues());
                const costs = deepCopy<InstallCost[]>(form.getValues(`costs`));
                const cost = costs[index];
                if (!cost) return;
                if (!community)
                    await updateModelInstallCost(data.id, {
                        ...data.meta,
                        installCosts: costs,
                    });
                else {
                    let meta: any = null;
                    let cd: ICommunityTemplate = deepCopy(data);
                    if (cd.meta?.installCosts) {
                        const { installCosts, ...mm } = cd.meta;
                        meta = mm;
                    }
                    console.log(cd.pivot?.meta);
                    let pMeta = cd.pivot?.meta || {};
                    (pMeta as any).installCost = cost?.costings;
                    console.log(data);
                    console.log(pMeta);

                    await updateCommunityModelInstallCost(
                        data.id,
                        data.pivotId,
                        pMeta,
                        meta
                    );
                }
                toast.message("Saved!");
            } catch (error) {
                console.log(error);
                toast.message("Invalid Form");
                return;
            }
        });
    }
    async function init(data) {
        console.log(data);
        const installs = await getInstallCostsAction();
        setCostSetting(installs);
        console.log(installs);
        if (community) {
            let cd = data as ICommunityTemplate;
            // cd.pivotId
            // console.log(cd)
            form.reset({
                costs: [
                    {
                        costings:
                            cd?.pivot?.meta?.installCost ||
                            cd?.meta?.installCosts?.[0]?.costings ||
                            {},
                    },
                ],
            });
        } else
            form.reset({
                costs: data.meta.installCosts || [{}],
                // enable: (data?.meta as any)?.overrideModelCost
            });
    }
    function costList(type) {
        return costSetting?.meta?.list?.filter(
            (t) =>
                (type == "punchout" && t.punchout) ||
                (!t.punchout && type != "punchout")
        );
    }
    return (
        <BaseModal<any>
            className="sm:max-w-[600px]"
            onOpen={(data) => {
                init(data);
            }}
            onClose={() => {}}
            modalName="installCost"
            Title={({ data }) => <div>Installation Costs</div>}
            Subtitle={({ data }) => (
                <>
                    {community ? (
                        <div>
                            {data?.project?.title}
                            {" | "}
                            {data?.modelName}
                            {" | "}
                            {data?.project?.builder?.name}
                        </div>
                    ) : (
                        <div>{data?.modelName}</div>
                    )}
                </>
            )}
            Content={({ data }) => (
                <div className="flex w-full divide-x">
                    <div className="hidden sm:w-1/3 space-y-2 pr-2">
                        <div className="">
                            <Label>Installations</Label>
                        </div>
                        <div className="">
                            <Button
                                disabled={fields.find((f) => !f.id) != null}
                                onClick={() => {
                                    append({
                                        title: "",
                                        costings: {},
                                    });
                                }}
                                variant="outline"
                                className="w-full h-7 mt-1"
                            >
                                <Plus className="mr-2 size-4" />
                                <span>New Install</span>
                            </Button>
                        </div>
                        <ScrollArea className="max-h-[350px] divide-y w-full">
                            {fields.map((f, i) => (
                                <Button
                                    variant={i == index ? "secondary" : "ghost"}
                                    className="text-sm cursor-pointer hover:bg-slate-200 h-8 text-start tex-sm p-0.5 w-full"
                                    key={i}
                                    onClick={() => setIndex(i)}
                                >
                                    <div>{f.title || "Default"}</div>
                                </Button>
                            ))}
                        </ScrollArea>
                    </div>
                    <div className="flex-1 flex flex-col  pl-2 gap-2">
                        <Tabs defaultValue="contractor" className="">
                            <TabsList>
                                <TabsTrigger value="contractor">
                                    Contractor
                                </TabsTrigger>
                                <TabsTrigger value="punchout">
                                    Punchout
                                </TabsTrigger>
                            </TabsList>
                            {["contractor", "punchout"].map((type) => (
                                <TabsContent
                                    key={type}
                                    className="flex flex-col"
                                    value={type}
                                >
                                    <ScrollArea className="h-[350px] divide-y w-full">
                                        <Table className="">
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="px-1">
                                                        Task
                                                    </TableHead>
                                                    {community && (
                                                        <TableHead className="px-1">
                                                            Def. Qty
                                                        </TableHead>
                                                    )}
                                                    <TableHead className="px-1">
                                                        Qty
                                                    </TableHead>
                                                    {/* <TableHead className="px-1 text-right" align="right">
                          Total
                        </TableHead> */}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {costList(type)?.map((l, i) => (
                                                    <TableRow
                                                        className={cn(
                                                            form.getValues(
                                                                `costs.${index}.costings.${l.uid}`
                                                            ) > 0
                                                                ? "bg-teal-50"
                                                                : ""
                                                        )}
                                                        key={i}
                                                    >
                                                        <TableCell className="px-1">
                                                            <PrimaryCellContent>
                                                                {l.title}
                                                            </PrimaryCellContent>
                                                            <SecondaryCellContent>
                                                                <Money
                                                                    value={
                                                                        l.cost
                                                                    }
                                                                />
                                                                {" per qty"}
                                                            </SecondaryCellContent>
                                                        </TableCell>
                                                        {community && (
                                                            <TableCell>
                                                                <CommunityDefaultQty
                                                                    form={form}
                                                                    project={
                                                                        data as any
                                                                    }
                                                                    costLine={l}
                                                                />
                                                            </TableCell>
                                                        )}
                                                        <TableCell>
                                                            <Input
                                                                className="h-7 w-20 px-2"
                                                                type={"number"}
                                                                {...form.register(
                                                                    `costs.${index}.costings.${l.uid}`
                                                                )}
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </ScrollArea>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </div>
                </div>
            )}
            Footer={({ data }) => (
                <>
                    {community && (
                        <div className="inline-flex items-center space-x-2">
                            <Label>Override Model Cost</Label>
                            <FormField
                                control={form.control}
                                name="enable"
                                render={({ field }) => (
                                    <Switch
                                        checked={field.value as any}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                        </div>
                    )}
                    <Btn
                        className="h-8"
                        isLoading={isSaving}
                        onClick={() => submit(data as any)}
                        size="sm"
                        type="submit"
                    >
                        Save
                    </Btn>
                </>
            )}
        />
    );
}
function CommunityDefaultQty({
    form,
    project,
    costLine,
}: {
    form;
    project: IProject;
    costLine: InstallCostLine;
}) {
    // `costs.${index}.costings.${l.uid}`;
    const qty = project?.meta?.installCosts?.[0]?.costings?.[costLine.uid] || 0;
    return (
        <Badge
            onClick={() => {
                if (qty) form.setValue(`costs.0.costings.${costLine.uid}`, "");
            }}
            className={cn(
                "cursor-pointer whitespace-nowrap",
                !form.getValues(`costs.0.costings.${costLine.uid}`) &&
                    Number(qty) > 0
                    ? "bg-green-200 text-green-700 hover:bg-green-200"
                    : "bg-slate-200 text-slate-700 hover:bg-slate-200"
            )}
        >
            {qty ? qty : "Not set"}
        </Badge>
    );
}
