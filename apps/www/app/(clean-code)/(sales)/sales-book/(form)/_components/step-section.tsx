import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useFormDataStore } from "../_common/_stores/form-data-store";
import HousePackageTool from "./hpt-step";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { formatMoney } from "@/lib/use-number";
import { useEffect, useMemo, useRef } from "react";
import { useIsVisible } from "@/hooks/use-is-visible";
import { motion } from "framer-motion";
import DevOnly from "@/_v2/components/common/dev-only";
import { StepHelperClass } from "../_utils/helpers/zus/step-component-class";
import MouldingLineItem from "./moulding-step";
import ServiceLineItem from "./service-step";
import { ComponentsSection } from "./components-section";

interface Props {
    stepUid?;
    isFirst;
    isLast;
}
export function StepSection({ stepUid, isFirst, isLast }: Props) {
    const zus = useFormDataStore();
    // const stepForm = zus?.kvStepForm?.[stepUid];
    const [uid] = stepUid?.split("-");
    const zItem = zus?.kvFormItem?.[uid];
    const { cls, Render, itemStepUid } = useMemo(() => {
        const cls = new StepHelperClass(stepUid);
        const ret = {
            cls,
            isHtp: cls.isHtp(),
            isMouldingLineItem: cls.isMouldingLineItem(),
            isServiceLineItem: cls.isServiceLineItem(),
            Render: ComponentsSection as any,
            itemStepUid: stepUid,
        };
        if (ret.isHtp) ret.Render = HousePackageTool;
        else if (ret.isMouldingLineItem) ret.Render = MouldingLineItem;
        else if (ret.isServiceLineItem) ret.Render = ServiceLineItem;
        return ret;
    }, [
        stepUid,
        // , zus
    ]);

    if (
        (!zItem.collapsed && zus.currentTab == "invoice") ||
        (zItem.collapsed && (isFirst || isLast))
    )
        return (
            <div>
                <div className="">
                    <Collapsible open={zItem.currentStepUid == stepUid}>
                        <StepSectionHeader cls={cls} />
                        <CollapsibleContent className="flex">
                            <Content>
                                <Render itemStepUid={stepUid} />
                            </Content>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        );
}
function Content({ children }) {
    const { isVisible, elementRef } = useIsVisible({});
    useEffect(() => {
        setTimeout(() => {
            if (!isVisible && elementRef.current) {
                const offset = -150; // Adjust this value to your desired offset
                const elementPosition =
                    elementRef.current.getBoundingClientRect().top +
                    window.scrollY;
                const offsetPosition = elementPosition + offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
            }
        }, 300);
    }, []);

    return (
        <motion.div
            ref={elementRef}
            transition={{ duration: 1 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
}

function StepSectionHeader({ cls }: { cls: StepHelperClass }) {
    const zus = useFormDataStore();
    const stepForm = zus?.kvStepForm?.[cls.itemStepUid];
    //   const cls = useMemo(() => ctx.cls.hasSelections(), [ctx.cls]);
    const { ...stat } = useMemo(() => {
        // const cls = new StepHelperClass(stepUid);
        return {
            hasSelection: cls.hasSelections(),
            selectionCount: cls.getTotalSelectionsCount(),
            selectionQty: cls.getTotalSelectionsQty(),
        };
    }, [cls.itemStepUid]);

    return (
        <CollapsibleTrigger asChild>
            <div className="border border-muted-foreground/20">
                <button
                    className="flex h-8 w-full p-1 gap-4 px-4  space-x-2 items-center text-sm uppercase bg-muted-foreground/5 hover:bg-muted-foreground/20"
                    onClick={(e) => {
                        e.preventDefault();
                        cls.toggleStep();
                    }}
                >
                    <Label>{stepForm?.title}</Label>
                    <div className="flex-1"></div>
                    <span className="font-mono">{stepForm.value}</span>
                    {stepForm.salesPrice ? (
                        <Badge variant="destructive" className="h-5 px-1">
                            ${formatMoney(stepForm.salesPrice)}
                        </Badge>
                    ) : null}
                    {stat.hasSelection && (
                        <>
                            <Badge variant="destructive" className="h-5 px-1">
                                selection: {stat.selectionCount}
                            </Badge>
                            <Badge variant="destructive" className="h-5 px-1">
                                qty: {stat.selectionQty}
                            </Badge>
                        </>
                    )}
                    <div className="">
                        <DevOnly>
                            <span>{stepForm?.componentUid}</span>
                            <span>--</span>
                            <span>{cls.itemStepUid}</span>
                            <span>-</span>
                            <span>{stepForm?.stepId}</span>
                        </DevOnly>
                    </div>
                </button>
            </div>
        </CollapsibleTrigger>
    );
}
