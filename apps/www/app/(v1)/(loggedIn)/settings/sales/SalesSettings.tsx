"use client";

import { saveSettingAction } from "@/app/(v1)/_actions/settings";
import { ISalesSetting } from "@/types/post";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import GeneralSettings from "./GeneralSettings";
import DoorWizardSettings from "./DoorWizard";
import Btn from "@/components/_v1/btn";

import SalesCommisionSettingSection from "./sales-commision";
import { Form } from "@/components/ui/form";
import { setDefaultCustomerProfile } from "../../sales/(customers)/_actions/sales-customer-profiles";

export default function SalesSettings({ data }) {
    const defaultValues: ISalesSetting = {
        ...data,
    } as any;
    const form = useForm<ISalesSetting>({
        defaultValues,
    });

    const [isPending, startTransition] = useTransition();
    async function save() {
        startTransition(async () => {
            const value = form.getValues();
            const resp = await saveSettingAction(value.id, {
                meta: value.meta,
            });
            await setDefaultCustomerProfile(+value?.meta?.salesProfileId);
            toast.success("Saved!");
        });
    }
    return (
        <Form {...form}>
            <div className="space-y-8">
                <div className="flex justify-end">
                    <Btn isLoading={isPending} onClick={save} className="h-8">
                        Save
                    </Btn>
                </div>
                <GeneralSettings form={form} />
                <SalesCommisionSettingSection form={form} />
                <DoorWizardSettings form={form} />
                <div className="flex justify-end">
                    <Btn isLoading={isPending} onClick={save} className="h-8">
                        Save
                    </Btn>
                </div>
            </div>
        </Form>
    );
}
