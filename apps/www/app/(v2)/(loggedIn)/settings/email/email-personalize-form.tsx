"use client";

import { _saveCommunitModelCostData } from "@/app/(v1)/_actions/community/community-model-cost";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { IUser } from "@/types/hrm";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { _saveEmailPersonalizeForm } from "./_save-email-personalize-form";
import Btn from "@/components/_v1/btn";
import { useTransition } from "react";

export default function EmailPersolizeForm({ user }: { user: IUser }) {
    const form = useForm<IUser>({
        defaultValues: {
            ...user,
        },
    });

    const [isPending, startTransition] = useTransition();
    async function submit() {
        // console.log(form.getValues("meta"));
        startTransition(async () => {
            await _saveEmailPersonalizeForm(form.getValues("meta"));
            toast.success("Saved");
        });
    }
    return (
        <div className="px-8">
            <div className="space-y-6">
                <div className="flex">
                    <div>
                        <h3 className="text-lg font-medium">
                            Sales Email Respond Channel
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Set where to receive email response from your sales
                            clients.
                        </p>
                    </div>
                    <div className="flex-1"></div>
                    <Btn isLoading={isPending} onClick={submit} className="h-8">
                        Save
                    </Btn>
                </div>
                <Separator />
                <Form {...form}>
                    <div className="grid gap-4 grid-cols-2">
                        <FormField
                            control={form.control}
                            name="meta.emailTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mail Title</FormLabel>
                                    <FormControl>
                                        <Input className="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            disabled
                            control={form.control}
                            name="meta.email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input className="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="meta.emailRespondTo"
                            render={({ field }) => (
                                <FormItem className="col-span-2">
                                    <FormLabel>Reply to</FormLabel>
                                    <FormControl>
                                        <Input className="" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
}
