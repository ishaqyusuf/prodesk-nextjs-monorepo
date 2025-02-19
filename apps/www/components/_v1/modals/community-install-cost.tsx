"use client";

import React, { useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import Btn from "../btn";
import BaseModal from "./base-modal";
import { toast } from "sonner";

import { useFieldArray, useForm } from "react-hook-form";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { IHomeTemplate, IProject, InstallCost } from "@/types/community";
import { ScrollArea } from "../../ui/scroll-area";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { deepCopy } from "@/lib/deep-copy";
import { InstallCostSettings } from "@/types/settings";
import { getSettingAction } from "@/app/(v1)/_actions/settings";
import {
    PrimaryCellContent,
    SecondaryCellContent,
} from "../columns/base-columns";
import Money from "../money";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../ui/table";
import { cn } from "@/lib/utils";
import { updateModelInstallCost } from "@/app/(v1)/_actions/community/install-costs";
import {
    updateCommunityCost,
    updateProjectMeta,
} from "@/app/(v1)/_actions/community/projects";
import { closeModal } from "@/lib/modal";
import { useAppSelector } from "@/store";
import { loadStaticList } from "@/store/slicers";

export default function CommunityInstallCostModal() {
    const route = useRouter();
    const [isSaving, startTransition] = useTransition();
    const form = useForm<{ costs: InstallCost[] }>({
        defaultValues: {},
    });
    const { append, fields } = useFieldArray({
        control: form.control,
        name: "costs",
    });

    const [index, setIndex] = useState(0);

    const installCostSetting = useAppSelector(
        (s) => s.slicers.installCostSetting
    );
    useEffect(() => {
        loadStaticList(
            "installCostSetting",
            installCostSetting,
            async () => await getSettingAction("install-price-chart")
        );
        // (async () => {
        //     const _costList = await getSettingAction("install-price-chart");
        //     console.log(_costList);
        //     setCostList(_costList as any);
        // })();
    }, []);

    async function submit(data: IProject) {
        startTransition(async () => {
            // if(!form.getValues)
            try {
                const costs = deepCopy<InstallCost[]>(form.getValues(`costs`));
                const cost = costs[index];
                if (!cost) return;
                await updateCommunityCost(data.id, {
                    ...data.meta,
                    installCosts: costs,
                });
                toast.message("Saved!");
                closeModal();
            } catch (error) {
                console.log(error);
                toast.message("Invalid Form");
                return;
            }
        });
    }
    async function init(data: IProject) {
        form.reset({
            costs: data.meta.installCosts || [{}],
        });
    }
    return (
        <BaseModal<IProject>
            className="sm:max-w-[500px]"
            onOpen={(data) => {
                init(data);
            }}
            onClose={() => {}}
            modalName="communityInstallCost"
            Title={({ data }) => <div>Default Community Install Costs</div>}
            Subtitle={({ data }) => (
                <div>
                    {data?.title}: {data?.builder.name}
                </div>
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
                        {/* <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input
                                type="number"
                                className="h-8"
                                {...form.register(`costs.${index}.title`)}
                            />
                        </div> */}
                        <ScrollArea className="max-h-[350px] divide-y w-full">
                            <Table className="">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="px-1">
                                            Task
                                        </TableHead>
                                        <TableHead className="px-1">
                                            Qty
                                        </TableHead>
                                        {/* <TableHead className="px-1 text-right" align="right">
                          Total
                        </TableHead> */}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {installCostSetting?.meta?.list?.map(
                                        (l, i) => (
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
                                                        <Money value={l.cost} />
                                                        {" per qty"}
                                                    </SecondaryCellContent>
                                                </TableCell>
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
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                        <div className="col-span-4 flex justify-end">
                            <Btn
                                className="h-8"
                                isLoading={isSaving}
                                onClick={() => submit(data as any)}
                                size="sm"
                                type="submit"
                            >
                                Save
                            </Btn>
                        </div>
                    </div>
                </div>
            )}
        />
    );
}
