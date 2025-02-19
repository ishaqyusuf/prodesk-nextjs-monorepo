import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import {
    useDykeCtx,
    useDykeForm,
    useDykeItemCtx,
} from "../../_hooks/form-context";
import { DykeStep } from "../../../type";
import ShelfItemIndex from "../step-items-list/item-section/shelf-item";

import LineItemSection from "../step-items-list/item-section/multi-item-tab/line-item-section/line-item-section";
import { StepProducts } from "../step-items-list/item-section/step-products";
import MultiComponentRender from "../step-items-list/item-section/multi-item-tab/multi-component-render";
import HousePackageTool from "../step-items-list/item-section/multi-item-tab/house-package-tools";

import { _modal } from "@/components/common/modal/provider";

import DevOnly from "@/_v2/components/common/dev-only";
import { Badge } from "@/components/ui/badge";
import Money from "@/components/_v1/money";

export interface DykeItemStepSectionProps {
    stepForm: DykeStep;
    stepIndex: number;
}
export function DykeInvoiceItemStepSection({
    stepForm,
    stepIndex,
}: DykeItemStepSectionProps) {
    const form = useDykeForm();
    const item = useDykeItemCtx();
    const [stepValue, stepCost] = form.watch([
        `itemArray.${item.rowIndex}.item.formStepArray.${stepIndex}.item.value`,
        `itemArray.${item.rowIndex}.item.formStepArray.${stepIndex}.item.price`,
    ] as any);
    const ctx = useDykeCtx();
    const stepActionNodeId = `${item.rowIndex}-${stepIndex}`;

    return (
        <Collapsible
            id={stepForm.step.title}
            data-value={stepForm.item?.value}
            className={cn(
                stepForm?.item?.meta?.hidden && "hidden",
                !item.expanded &&
                    ![
                        "Item Type",
                        "House Package Tool",
                        "Line Item",
                        "Shelf Items",
                    ].includes(stepForm.step?.title as any) &&
                    "hidden"
            )}
            open={stepIndex == item.openedStepIndex}
            // onOpenChange={() => item.openBlock(stepIndex)}
        >
            <CollapsibleTrigger asChild>
                <div className="flex bg-accent">
                    <button
                        className="flex  w-full p-1 px-4 border space-x-2"
                        onClick={(e) => {
                            e.preventDefault();
                            if (stepForm?.item?.meta?.hidden) return;
                            item.toggleStep(stepIndex);
                        }}
                    >
                        <span className="font-semibold">
                            {stepForm?.step?.title}:
                        </span>
                        <span>{stepValue}</span>
                        {stepCost && (
                            <Badge variant="destructive">
                                <Money value={stepCost} />
                            </Badge>
                        )}
                        <DevOnly>
                            <span>
                                {stepForm?.step?.id}-{stepForm?.step.uid}
                            </span>
                        </DevOnly>
                    </button>
                    <div className="" id={stepActionNodeId}></div>
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-8 border ">
                {stepForm?.step?.title == "House Package Tool" ? (
                    // <HousePackageTool />
                    <>
                        <MultiComponentRender Render={HousePackageTool} />
                    </>
                ) : stepForm?.step?.title == "Shelf Items" ? (
                    <>
                        <ShelfItemIndex />
                    </>
                ) : stepForm?.step?.title == "Line Item" ? (
                    <>
                        <MultiComponentRender line Render={LineItemSection} />
                    </>
                ) : (
                    <StepProducts
                        stepActionNodeId={stepActionNodeId}
                        stepForm={stepForm}
                        stepIndex={stepIndex}
                    />
                )}
            </CollapsibleContent>
        </Collapsible>
    );
}
