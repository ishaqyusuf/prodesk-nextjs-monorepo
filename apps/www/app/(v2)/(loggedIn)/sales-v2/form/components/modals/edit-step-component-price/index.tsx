import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { IStepProducts } from "../../step-items-list/item-section/step-products";
import Modal from "@/components/common/modal";
import { Form } from "@/components/ui/form";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import FormInput from "@/components/common/controls/form-input";
import { DykeForm } from "../../../../type";
import { useModal } from "@/components/common/modal/provider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { saveAction } from "./action";
import { triggerRefresh } from "../../../dyke-refresher";

interface Props {
    stepProducts: IStepProducts;
    baseForm: UseFormReturn<DykeForm>;
    rowIndex;
}

export default function EditStepComponentPrice(props: Props) {
    const form = useForm({
        defaultValues: {
            stepProducts: props.stepProducts.map((p) => {
                if (!p.product.meta?.priced) p.product.price = null as any;
                return p;
            }),
        },
    });

    const field = useFieldArray({
        control: form.control,
        name: "stepProducts",
    });
    const modal = useModal();
    async function save() {
        const prods = form.getValues("stepProducts");
        await saveAction(
            prods
                .filter(
                    (p) =>
                        p.product.price !=
                        props.stepProducts.find((sp) => sp.id == p.id)?.product
                            ?.price
                )
                .map((sp) => {
                    sp.product.meta.priced = true;
                    return {
                        id: sp.product.id,
                        meta: sp.product.meta,
                        price: sp.product.price,
                    };
                })
        );
        triggerRefresh(props.baseForm, props.rowIndex, "components");
        modal.close();
    }
    return (
        <Form {...form}>
            <Modal.Content>
                <Modal.Header title="Edit Component Price" />
                <ScrollArea className="h-[350px]">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Component</TableHead>
                                <TableHead>Price</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="">
                            {field.fields.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell className="uppercase ">
                                        {item.product.title}
                                    </TableCell>
                                    <TableCell className="w-28">
                                        <FormInput
                                            type="number"
                                            control={form.control}
                                            name={`stepProducts.${index}.product.price`}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
                <Modal.Footer submitText="save" onSubmit={save} />
            </Modal.Content>
        </Form>
    );
}
