import Modal from "@/components/common/modal";
import { useForm } from "react-hook-form";
import { IDykeShelfProducts } from "../../../../type";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/controls/form-input";
import { _saveDykeShelfItemProduct } from "../../../_action/get-shelf-products.actions";
import { useModal } from "@/components/common/modal/provider";

interface Props {
    categoryIds;
    prod;
    onCreate;
}
export default function ShelfItemModal({ prod, onCreate }: Props) {
    const form = useForm<IDykeShelfProducts>({
        defaultValues: {
            ...prod,
        },
    });
    const modal = useModal();
    async function submit() {
        const { id, ...data } = form.getValues();
        const item = await _saveDykeShelfItemProduct(id, data);
        onCreate(item);
        modal?.close();
    }
    return (
        <Form {...form}>
            <Modal.Content>
                <Modal.Header title="" />
                <div className="grid gap-4">
                    <FormInput
                        control={form.control}
                        name="title"
                        label="Product Title"
                    />
                    <FormInput
                        type="number"
                        control={form.control}
                        name="unitPrice"
                        label="Price"
                    />
                </div>
                <Modal.Footer onSubmit={submit} submitText="Save" />
            </Modal.Content>
        </Form>
    );
}
