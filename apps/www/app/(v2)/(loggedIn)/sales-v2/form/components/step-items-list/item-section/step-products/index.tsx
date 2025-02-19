import { DykeItemStepSectionProps } from "../../../item-section/components-section";

import { cn } from "@/lib/utils";

import { getStepProduct } from "../../../../_action/get-dyke-step-product";

import { Icons } from "@/components/_v1/icons";

import useStepItems, {
    StepItemCtx,
    useStepItemCtx,
} from "../../../../_hooks/use-step-items";
import { StepProduct } from "./product";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/controls/form-input";
import { toast } from "sonner";
import { useEffect } from "react";
import { useIsVisible } from "@/hooks/use-is-visible";
import { motion } from "framer-motion";
import { Sortable, SortableItem } from "@/components/ui/sortable";
import { closestCorners } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { _modal, useModal } from "@/components/common/modal/provider";
import { useDykeCtx, useDykeForm } from "../../../../_hooks/form-context";
import { BatchSelectionAction } from "../../../../_hooks/use-prod-batch-action";
import {
    LegacyDykeFormStepContext,
    useLegacyDykeFormStep,
} from "@/app/(clean-code)/(sales)/sales-book/(form)/_hooks/legacy/use-dyke-form-step";
import RestoreComponentsModal from "../../../modals/restore-modal";
import { ArchiveRestoreIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

import StepMenu from "./step-trigger";
import stepHelpers from "@/app/(clean-code)/(sales)/sales-book/(form)/_utils/helpers/step-helper";
import Button from "@/components/common/button";
import { createCustomDykeStepUseCase } from "@/app/(clean-code)/(sales)/_common/use-case/dyke-steps-use-case";
import salesFormUtils from "@/app/(clean-code)/(sales)/_common/utils/sales-form-utils";
import { useLegacyDykeFormStepContext } from "@/app/(clean-code)/(sales)/sales-book/(form)/_hooks/legacy/use-dyke-form-step";
export interface StepProductProps extends DykeItemStepSectionProps {
    stepActionNodeId;
    // rowIndex;
    // stepProducts: IStepProducts;
    // setStepProducts;
    // allowAdd;
    // allowCustom;
    // sortMode?: boolean;
}
export type IStepProducts = Awaited<ReturnType<typeof getStepProduct>>;
export function StepProducts({
    stepForm,
    stepIndex,
    stepActionNodeId,
}: // rowIndex,
// allowAdd,
// allowCustom,
// // stepProducts,
// sortMode,
// setStepProducts,
StepProductProps) {
    const legacyStepCtx = useLegacyDykeFormStepContext(stepIndex, stepForm);
    const {
        components,
        setComponents,
        itemCtx: { rowIndex },
        watch: { sortMode },
    } = legacyStepCtx;
    const { allowAdd, allowCustom } = legacyStepCtx.watch;
    const stepItemCtx = useStepItems(legacyStepCtx);
    const {
        openStepForm,
        isMultiSection,
        selectProduct,
        ctx,
        // deleteStepItem,
        deleteStepItemModal,
        // allowCustom,
        ...stepCtx
    } = stepItemCtx;

    const form = useDykeForm();
    const dykeCtx = useDykeCtx();
    const { isVisible, elementRef } = useIsVisible({});
    useEffect(() => {
        setTimeout(() => {
            if (!isVisible && elementRef.current) {
                const offset = -150; // Adjust this value to your desired offset
                const elementPosition =
                    elementRef.current.getBoundingClientRect().top +
                    window.scrollY;
                const offsetPosition = elementPosition + offset;
                // elementRef.current.scrollIntoView({
                //     behavior: "smooth",
                //     block: "start",
                // });
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        }, 300);
    }, []);
    const modal = useModal();

    return (
        <StepItemCtx.Provider value={stepItemCtx}>
            <LegacyDykeFormStepContext.Provider value={legacyStepCtx}>
                <StepMenu stepActionNodeId={stepActionNodeId} />
                <motion.div
                    ref={elementRef}
                    // initial={{ opacity: 0 }}
                    // animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 1 }}
                    style={{}}
                >
                    <Sortable
                        orientation="mixed"
                        collisionDetection={closestCorners}
                        value={legacyStepCtx.components}
                        onValueChange={legacyStepCtx.setComponents}
                        overlay={
                            <div className="size-full rounded-md bg-primary/10" />
                        }
                    >
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                            {components
                                // ?.filter(
                                //     (s) => !s.custom && !s._metaData?.hidden
                                // )
                                .map((item, i) => (
                                    <SortableItem
                                        key={item.id}
                                        value={item.id}
                                        asTrigger={sortMode}
                                        asChild
                                    >
                                        <Card className="border-none flex flex-col h-full bg-red-50">
                                            <StepProduct
                                                className={cn(
                                                    "relative border-muted-foreground/10  borno group",
                                                    !sortMode &&
                                                        "hover:border-muted-foreground"
                                                )}
                                                isMultiSection={isMultiSection}
                                                select={selectProduct}
                                                loadingStep={ctx.loadingStep}
                                                item={item as any}
                                                itemIndex={i}
                                                deleteStepItem={() =>
                                                    deleteStepItemModal([item])
                                                }
                                                openStepForm={openStepForm}
                                                isRoot={stepCtx.isRoot}
                                            />
                                        </Card>
                                    </SortableItem>
                                ))}
                            {allowAdd && dykeCtx.superAdmin && (
                                <div className="p-4">
                                    <button
                                        onClick={() => {
                                            openStepForm();
                                        }}
                                        className={cn(
                                            "border hover:shadow-xl hover:bg-slate-200 rounded-lg flex flex-col justify-center items-center h-[200px] w-full"
                                        )}
                                    >
                                        <Icons.add />
                                    </button>
                                </div>
                            )}
                            {legacyStepCtx.deletedComponents?.length > 0 &&
                                dykeCtx.superAdmin && (
                                    <>
                                        <div className="p-4">
                                            <button
                                                onClick={() => {
                                                    _modal.openModal(
                                                        <RestoreComponentsModal
                                                            stepCtx={
                                                                legacyStepCtx
                                                            }
                                                        />
                                                    );
                                                }}
                                                className={cn(
                                                    "border border-red-500 bg-red-50/50 hover:shadow-xl hover:bg-red-50 rounded-lg flex flex-col justify-center items-center h-[200px] w-full"
                                                )}
                                            >
                                                <ArchiveRestoreIcon />
                                                <Label className="mt-4">
                                                    Restore
                                                </Label>
                                            </button>
                                        </div>
                                    </>
                                )}
                            {allowCustom && (
                                <>
                                    <CustomInput
                                        currentValue={
                                            (stepForm.item.meta as any)?.custom
                                                ? stepForm.item.value
                                                : ""
                                        }
                                    />
                                </>
                            )}
                        </div>
                    </Sortable>

                    {isMultiSection && (
                        <div className="flex justify-end">
                            <Button onClick={() => selectProduct(false)}>
                                Proceed
                            </Button>
                        </div>
                    )}
                    <div className="flex justify-center">
                        {ctx.loadingStep && (
                            <Icons.spinner className="h-8 w-8 animate-spin" />
                        )}
                    </div>
                </motion.div>
                <BatchSelectionAction />
                {sortMode && (
                    <div className="fixed shadow-xl  z-10 mb-16 bottom-0 left-1/2">
                        <Button
                            onClick={() =>
                                stepHelpers.finishSort(legacyStepCtx)
                            }
                            size="sm"
                        >
                            Finish Sort
                        </Button>
                    </div>
                )}
            </LegacyDykeFormStepContext.Provider>
        </StepItemCtx.Provider>
    );
}
function CustomInput({ currentValue }) {
    const inputForm = useForm({
        defaultValues: {
            value: currentValue,
            price: null,
        },
    });
    const ctx = useLegacyDykeFormStep();
    const stepCtx = useStepItemCtx();
    async function createCustom() {
        const formData = inputForm.getValues();
        const resp = await createCustomDykeStepUseCase({
            price: formData.price,
            dependenciesUid: ctx.dependenciesUid,
            dykeStepId: ctx.step.step.id,
            title: formData.value,
        });
        stepCtx.selectProduct(true, {
            custom: true,
            ...resp.prod,
            product: {
                ...resp.prod.product,
            },
            _metaData: formData.price
                ? {
                      basePrice: formData.price,
                      price: salesFormUtils.salesProfileCost(
                          ctx.mainCtx.form,
                          formData.price
                      ),
                  }
                : {},
        } as any);
        // ctx.
        //  const value = inputForm.getValues("value")?.trim();
        //  if (!value) toast.error("Invalid value");
        //  else onProceed(value);
    }
    return (
        <Form {...inputForm}>
            <div className="flex ">
                <div className="flex flex-col gap-2">
                    <FormInput
                        name="value"
                        control={inputForm.control}
                        label="Custom"
                    />
                    <FormInput
                        name="price"
                        control={inputForm.control}
                        label="Price"
                        type="number"
                    />
                    <div className="flex justify-end">
                        <Button size="sm" onClick={createCustom}>
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </Form>
    );
}
