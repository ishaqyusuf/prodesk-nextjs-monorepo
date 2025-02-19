import { Icons } from "@/components/_v1/icons";
import { _modal } from "@/components/common/modal/provider";
import { Button } from "@/components/ui/button";
import FormSettingsModal from "./modals/form-settings-modal";
import { useFormDataStore } from "../_common/_stores/form-data-store";
import { Sticky, useSticky } from "../_hooks/use-sticky";
import { cn } from "@/lib/utils";
import ItemSection from "./item-section";
import { zhAddItem } from "../_utils/helpers/zus/zus-form-helper";
import { Label } from "@/components/ui/label";
import Money from "@/components/_v1/money";

export function FormFooter() {
    const zus = useFormDataStore();

    const sticky = useSticky((bv, pv, { top, bottom }) => {
        const isFixed = !pv;

        return isFixed;
    }, true);
    const { isFixed, fixedOffset, containerRef } = sticky;

    return (
        <>
            <div
                className="pb-16 flex flex-col gap-4"
                ref={sticky.containerRef}
            >
                <div
                    style={
                        isFixed
                            ? {
                                  left: `${
                                      containerRef?.current?.getBoundingClientRect()
                                          ?.left
                                  }px`,
                                  width: `${
                                      containerRef?.current?.getBoundingClientRect()
                                          ?.width
                                  }px`,
                                  //   right: `${
                                  //       containerRef?.current?.getBoundingClientRect()
                                  //           ?.right
                                  //   }px`,
                              }
                            : {}
                    }
                    className={cn(
                        "flex border-b items-center",
                        isFixed
                            ? "fixed sborder-2 border-muted-foreground/50 shadow-xl border-t  overflow-hidden srounded-full  bottom-0 bg-backgrounds z-10 h-12 px-4"
                            : "justify-end border-t"
                    )}
                >
                    <div className="flex-1 bg-background flex h-full">
                        <div className=""></div>
                        <div className="flex-1" />
                        <div
                            className={cn(
                                isFixed
                                    ? "inline-flex gap-4 sm:gap-6"
                                    : "flex flex-col gap-4 sm:gap-6 min-w-[250px] p-4"
                            )}
                        >
                            <FixedDisplay
                                label={"Sub Total"}
                                value={zus.metaData?.pricing?.subTotal}
                            />
                            <FixedDisplay
                                label={"Discount"}
                                value={zus.metaData?.pricing?.discount}
                            />
                            <FixedDisplay
                                label={`${zus.metaData?.tax?.title} (${zus.metaData?.tax?.percentage}%)`}
                                value={zus.metaData?.pricing?.taxValue}
                            />
                            <FixedDisplay
                                label={`C.C.C ${
                                    !zus.metaData?.pricing?.ccc ? "" : "(3%)"
                                }`}
                                value={zus.metaData?.pricing?.ccc}
                            />

                            <FixedDisplay
                                label={"Total"}
                                value={zus.metaData?.pricing?.grandTotal}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
function FixedDisplay({ label, value }) {
    return (
        <div className="inline-flex items-center justify-between gap-1">
            <Label className="uppercase text-muted-foreground font-semibold">
                {label}:
            </Label>
            <div className="text-sm font-semibold font-mono">
                <Money value={value} />
            </div>
        </div>
    );
}
