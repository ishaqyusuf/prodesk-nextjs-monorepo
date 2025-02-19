import FormInput from "@/components/common/controls/form-input";
import Modal from "@/components/common/modal";
import { Form } from "@/components/ui/form";
import { Taxes } from "@prisma/client";
import { useForm } from "react-hook-form";
import { createTax } from "./action";
import { useModal } from "@/components/common/modal/provider";

interface Props {
    onCreate?(tax: Taxes);
}
export default function TaxModal({ onCreate }: Props) {
    const form = useForm<Taxes>({
        defaultValues: {},
    });
    async function onSubmit() {
        const data = form.getValues();
        const resp = await createTax(data);
        onCreate?.(resp);
        modal.close();
    }
    const modal = useModal();
    return (
        <Modal.Content size="sm">
            <Modal.Header title={"Tax"} />
            <Form {...form}>
                <div className="grid gap-2">
                    <FormInput
                        size="sm"
                        label="Title"
                        control={form.control}
                        name="title"
                    />
                    <FormInput
                        size="sm"
                        label="Percentage"
                        control={form.control}
                        name="percentage"
                    />
                </div>
            </Form>
            <Modal.Footer submitText="Save" onSubmit={onSubmit} />
        </Modal.Content>
    );
}
