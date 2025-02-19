"use client";

import React, { useTransition } from "react";

import { useRouter } from "next/navigation";

import { _useAsync } from "@/lib/use-async";
import Btn from "../btn";
import BaseModal from "./base-modal";
import { closeModal } from "@/lib/modal";
import { toast } from "sonner";

import { useForm } from "react-hook-form";

import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { EmployeeProfile } from "@prisma/client";

import { saveEmployeeProfile } from "@/app/(v1)/_actions/hrm/employee-profiles";

export default function EmployeeProfileModal() {
    const route = useRouter();
    const [isSaving, startTransition] = useTransition();
    const form = useForm<EmployeeProfile>({
        defaultValues: {},
    });
    async function submit(data) {
        startTransition(async () => {
            // if(!form.getValues)
            try {
                //  const isValid = employeeSchema.parse(form.getValues());
                if (!data?.id)
                    await saveEmployeeProfile({
                        ...form.getValues(),
                        discount: +(form.getValues("discount") || 0),
                    });

                closeModal();
                toast.message("Success!");
                route.refresh();
            } catch (error) {
                toast.message("Invalid Form");
                return;
            }
        });
    }

    async function init(data) {
        form.reset(
            !data
                ? {}
                : {
                      ...data,
                  }
        );
    }
    return (
        <BaseModal<EmployeeProfile | undefined>
            className="sm:max-w-[350px]"
            onOpen={(data) => {
                init(data);
            }}
            onClose={() => {}}
            modalName="employeeProfile"
            Title={({ data }) => (
                <div>
                    {data?.id ? "Edit" : "Create"}
                    {" Employee Profile"}
                </div>
            )}
            Content={({ data }) => (
                <div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="grid gap-2 col-span-2">
                            <Label>Profile Name</Label>
                            <Input
                                placeholder=""
                                className="h-8"
                                {...form.register("name")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Discount (%)</Label>
                            <Input
                                type="number"
                                className="h-8"
                                {...form.register("discount")}
                            />
                        </div>
                    </div>
                </div>
            )}
            Footer={({ data }) => (
                <Btn
                    isLoading={isSaving}
                    onClick={() => submit(data)}
                    size="sm"
                    type="submit"
                >
                    Save
                </Btn>
            )}
        />
    );
}
