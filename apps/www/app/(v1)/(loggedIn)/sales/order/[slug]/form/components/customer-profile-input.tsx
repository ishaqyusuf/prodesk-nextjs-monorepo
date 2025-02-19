"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ISalesOrderForm } from "@/types/sales";
import { CustomerTypes } from "@prisma/client";

export function SalesCustomerProfileInput({
    form,
    profiles,
}: {
    form: ISalesOrderForm;
    profiles: CustomerTypes[];
}) {
    const profileId = form.watch("customerProfileId");

    return (
        <div className="flex justify-end">
            <Select
                value={profileId as any}
                onValueChange={(value) => {
                    const selection = profiles.find(
                        (profile) => profile.title == value
                    );
                    if (selection) {
                        //   form.setValue("meta.sales_profile", value);
                        form.setValue(
                            "meta.sales_percentage",
                            selection.coefficient
                        );
                    }
                }}
            >
                <SelectTrigger className="h-6 min-w-[100px]">
                    <SelectValue placeholder="Profile" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {profiles?.map((profile, _) => (
                            <SelectItem key={_} value={profile.title}>
                                {profile.title}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
