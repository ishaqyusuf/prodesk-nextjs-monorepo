import { useForm } from "react-hook-form";
import { useFormDataStore } from "../../_common/_stores/form-data-store";
import { UseStepContext } from "./ctx";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/controls/form-input";
import Button from "@/components/common/button";
import { useMemo } from "react";
import AutoComplete from "@/components/_v1/common/auto-complete";
import {
    createCustomComponentUseCase,
    updateCustomComponentUseCase,
} from "@/app/(clean-code)/(sales)/_common/use-case/step-component-use-case";
import { ComponentHelperClass } from "../../_utils/helpers/zus/step-component-class";
import { toast } from "sonner";

interface Props {
    ctx: UseStepContext;
}
export function CustomComponent({ ctx }: Props) {
    const zus = useFormDataStore();
    const stepForm = ctx.cls.getStepForm();
    const form = useForm({
        defaultValues: {
            title: "",
            basePrice: "",
            salesPrice: "",
        },
    });
    const customInputs = useMemo(
        () => ctx.stepComponents?.filter((s) => s._metaData.custom),
        [ctx.stepComponents]
    );
    const hasCost = useMemo(
        () => ctx.items?.filter((s) => s.salesPrice)?.length > 0,
        [ctx.items]
    );
    async function _continue() {
        const data = form.getValues();
        console.log(data);

        if (!data.title) {
            toast.error("Invalid custom input");
            return;
        }
        let cls: ComponentHelperClass;
        let eProd = customInputs?.find((s) => s.title == data.title);
        console.log({ data, eProd });

        if (!eProd) {
            eProd = (await createCustomComponentUseCase({
                title: data.title,
                price: data.basePrice ? +data.basePrice : null,
                stepId: stepForm?.stepId,
            })) as any;
            cls = new ComponentHelperClass(
                ctx.cls.itemStepUid,
                eProd.uid,
                eProd
            );
            if (data.basePrice) {
                await cls.fetchUpdatedPrice();
            }
            ctx.cls.addStepComponent(eProd);
        } else {
            if (eProd.basePrice != data.basePrice && data.basePrice) {
                eProd = await updateCustomComponentUseCase({
                    price: +data.basePrice,
                    id: eProd.id,
                });
                cls = new ComponentHelperClass(
                    ctx.cls.itemStepUid,
                    eProd.uid,
                    eProd
                );
                await cls.fetchUpdatedPrice();
            }
        }
        if (eProd) {
            if (!cls)
                cls = new ComponentHelperClass(ctx.cls.itemStepUid, eProd.uid);
            cls.selectComponent();
        }
    }
    return (
        <Form {...form}>
            <div className="relative p-2 min-h-[25vh] xl:min-h-[40hv]  group  flex flex-col gap-4">
                {/* {customInputs?.length ? (
                    <AutoComplete
                        onSelect={(value: any) => {
                            form.setValue("salesPrice", value?.salesPrice);
                            form.setValue("basePrice", value?.basePrice);
                        }}
                        itemText={"label"}
                        allowCreate
                        itemValue={"value"}
                        options={customInputs}
                        size="sm"
                        form={form}
                        formKey={"title"}
                        label={"Custom"}
                        perPage={10}
                    />
                ) : ( */}
                <FormInput
                    label="Custom"
                    size="sm"
                    control={form.control}
                    name="title"
                    className="uppercase"
                />
                {/* )} */}
                {hasCost ? (
                    <FormInput
                        label="Price"
                        type="number"
                        size="sm"
                        prefix="$"
                        control={form.control}
                        name="basePrice"
                    />
                ) : null}
                <div className="flex justify-end">
                    <Button onClick={_continue}>Continue</Button>
                </div>
            </div>
        </Form>
    );
}
