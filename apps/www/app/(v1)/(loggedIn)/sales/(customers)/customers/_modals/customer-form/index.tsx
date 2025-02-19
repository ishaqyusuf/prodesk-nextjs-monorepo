"use client";

import {
    useCustomerProfiles,
    useStaticRoles,
} from "@/_v2/hooks/use-static-data";
import { _revalidate } from "@/app/(v1)/_actions/_revalidate";
import {
    createEmployeeAction,
    saveEmployeeAction,
} from "@/app/(v1)/_actions/hrm/save-employee";
import { staticRolesAction } from "@/app/(v1)/_actions/hrm/static-roles";

import FormAutoCompleteInput from "@/components/common/controls/form-auto-complete-input";
import FormInput from "@/components/common/controls/form-input";

import Modal from "@/components/common/modal";
import { useModal } from "@/components/common/modal/provider";
import { Form } from "@/components/ui/form";
import { employeeSchema } from "@/lib/validations/hrm";
import { IUser } from "@/types/hrm";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateCustomerAction } from "../../../../_actions/customer.crud";
import { ICustomer } from "@/types/customers";
import FormSelect from "@/components/common/controls/form-select";
import { saveCustomer } from "../../../_actions/sales-customers";

interface Props {
    defaultData?;
}
export default function CustomerFormModal({ defaultData }: Props) {
    const form = useForm<ICustomer>({
        defaultValues: {
            ...defaultData,
        },
    });
    // const watchProfileId = form.watch("customerTypeId");
    const modal = useModal();
    const profiles = useCustomerProfiles();

    async function submit() {
        try {
            // const isValid = emailSchema.parse(form.getValues());
            const data = form.getValues();
            if (!data.id)
                await saveCustomer({
                    ...data,
                });
            else
                await updateCustomerAction({
                    ...data,
                });
            modal.close();
            toast.message("Saved!");
            _revalidate("customers");
        } catch (error) {
            console.log(error);
            toast.message("Invalid Form");
            return;
        }
    }
    return (
        <Form {...form}>
            <Modal.Content>
                <Modal.Header title="Customer Form" />
                <div className="grid gap-2 sm:grid-cols-2">
                    <FormInput
                        control={form.control}
                        name="businessName"
                        size="sm"
                        className="sm:col-span-2"
                        label="Business Name"
                    />
                    <FormInput
                        control={form.control}
                        name="name"
                        className="sm:col-span-2"
                        size="sm"
                        label="Name"
                    />

                    <FormInput
                        control={form.control}
                        name="email"
                        size="sm"
                        label="Email"
                    />
                    <FormInput
                        control={form.control}
                        name="phoneNo"
                        size="sm"
                        label="Phone No"
                    />

                    <FormSelect
                        className="sm:col-span-2"
                        control={form.control}
                        name="customerTypeId"
                        size="sm"
                        label="Profile"
                        options={[
                            ...profiles?.data?.map((d) => ({
                                label: d.title,
                                value: d.id,
                            })),
                        ]}
                    />
                    <FormInput
                        control={form.control}
                        name="primaryAddress.address1"
                        label="Address"
                        size="sm"
                    />
                    <FormInput
                        control={form.control}
                        name="primaryAddress.state"
                        label="State"
                        size="sm"
                    />
                    <FormInput
                        control={form.control}
                        name="primaryAddress.city"
                        label="City"
                        size="sm"
                    />
                    <FormInput
                        control={form.control}
                        name="primaryAddress.meta.zip_code"
                        label="Zip code"
                        size="sm"
                    />
                </div>
                <Modal.Footer onSubmit={submit} />
            </Modal.Content>
        </Form>
    );
}
