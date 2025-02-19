"use client";

import React, { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { _useAsync } from "@/lib/use-async";
import Btn from "../btn";
import BaseModal from "./base-modal";
import { closeModal } from "@/lib/modal";
import { toast } from "sonner";

import { useForm } from "react-hook-form";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { emailSchema } from "@/lib/validations/email";
import { ICustomer } from "@/types/customers";
import { CustomerTypes } from "@prisma/client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { ArrowLeft } from "lucide-react";
import { IProject } from "@/types/community";
import { useAppSelector } from "@/store";
import { loadStaticList } from "@/store/slicers";
import { staticBuildersAction } from "@/app/(v1)/(loggedIn)/settings/community/builders/action";
import { projectSchema } from "@/lib/validations/community-validations";
import { saveProject } from "@/app/(v1)/_actions/community/projects";
import { useBuilders } from "@/_v2/hooks/use-static-data";

export default function ProjectModal() {
    const route = useRouter();
    const [isSaving, startTransition] = useTransition();
    const form = useForm<IProject>({
        defaultValues: {},
    });
    async function submit() {
        startTransition(async () => {
            // if(!form.getValues)
            try {
                const isValid = projectSchema.parse(form.getValues());

                await saveProject({
                    ...form.getValues(),
                });
                // resp.
                closeModal();
                toast.message("Project Created!");
            } catch (error) {
                console.log(error);
                toast.message("Invalid Form");
                return;
            }
        });
    }
    const builders = useBuilders();

    async function init(data) {
        form.reset(
            !data
                ? {
                      meta: {},
                  }
                : {
                      ...data,
                  }
        );
    }
    const watchBuilderId = form.watch("builderId");
    return (
        <BaseModal<IProject | undefined>
            className="sm:max-w-[550px]"
            onOpen={(data) => {
                init(data);
            }}
            onClose={() => {}}
            modalName="project"
            Title={({ data }) => <div>Create Project</div>}
            Content={({ data }) => (
                <div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2 col-span-2">
                            <Label>Name</Label>
                            <Input
                                placeholder=""
                                className="h-8"
                                {...form.register("title")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Ref No.</Label>
                            <Input
                                className="h-8"
                                {...form.register("refNo")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Builder</Label>
                            <Select
                                onValueChange={(value) => {
                                    form.setValue("builderId", Number(value));
                                }}
                                value={`${watchBuilderId}`}
                            >
                                <SelectTrigger className="h-8">
                                    <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {builders.data?.map((builder, _) => (
                                            <SelectItem
                                                key={_}
                                                value={`${builder.id}`}
                                            >
                                                {builder.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid gap-2 col-span-2">
                            <Label>Address</Label>
                            <Input
                                className="h-8"
                                {...form.register("address")}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>Supervisor</Label>
                            <Input
                                placeholder=""
                                className="h-8"
                                {...form.register("meta.supervisor.name")}
                            />
                        </div>
                        <div className="grid gap-2 ">
                            <Label>Supervisor Email</Label>
                            <Input
                                placeholder=""
                                className="h-8"
                                {...form.register("meta.supervisor.email")}
                            />
                        </div>
                    </div>
                </div>
            )}
            Footer={({ data }) => (
                <Btn
                    isLoading={isSaving}
                    onClick={() => submit()}
                    size="sm"
                    type="submit"
                >
                    Save
                </Btn>
            )}
        />
    );
}
