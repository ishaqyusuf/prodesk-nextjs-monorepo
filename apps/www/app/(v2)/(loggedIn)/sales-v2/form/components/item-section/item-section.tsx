import { Icons } from "@/components/_v1/icons";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
    DykeItemFormContext,
    useDykeCtx,
    useDykeForm,
    useDykeItemCtx,
} from "../../_hooks/form-context";
import useDykeItem, { IDykeItemFormContext } from "../../_hooks/use-dyke-item";
import { cn, generateRandomString } from "@/lib/utils";
import { _deleteDykeItem } from "../../_action/delete-item";
import FormInput from "@/components/common/controls/form-input";
import {
    Menu,
    MenuItem,
} from "@/components/_v1/data-table/data-table-row-actions";
import {
    LegacyDykeFormItemContext,
    useLegacyDykeFormItemContext,
} from "@/app/(clean-code)/(sales)/sales-book/(form)/_hooks/legacy-hooks";
import { DykeInvoiceItemStepSection } from "./components-section";

interface Props {
    rowIndex;
}
export function DykeInvoiceItemSection({ rowIndex }: Props) {
    const form = useDykeForm();
    // const configIndex = form.watch(`items.${rowIndex}.meta.configIndex`);
    const dykeCtx = useDykeCtx();
    const item = useDykeItem(rowIndex, dykeCtx.itemArray);
    const ctx = {
        ...item,
    } as IDykeItemFormContext;

    const legacyCtx = useLegacyDykeFormItemContext(rowIndex);

    return (
        <LegacyDykeFormItemContext.Provider value={legacyCtx}>
            <DykeItemFormContext.Provider value={ctx}>
                <Collapsible
                    open={item.opened}
                    onOpenChange={item.openChange}
                    className={cn(rowIndex > 0 && "mt-4")}
                >
                    <ItemHeader item={item} />
                    <CollapsibleContent className="">
                        <div className="grid sm:grid-cols-3 overflow-auto max-h-[110vh]">
                            <div className="sm:col-span-3">
                                {item.formStepArray.map((formStep, bIndex) => (
                                    <DykeInvoiceItemStepSection
                                        stepForm={formStep as any}
                                        stepIndex={bIndex}
                                        key={bIndex}
                                    />
                                ))}
                            </div>
                            {/* <div className="hidden sm:col-span-1"></div> */}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </DykeItemFormContext.Provider>
        </LegacyDykeFormItemContext.Provider>
    );
}
interface ItemHeaderProps {
    item: IDykeItemFormContext;
}
function ItemHeader({ item }: ItemHeaderProps) {
    const dykeCtx = useDykeCtx();
    const itemCtx = useDykeItemCtx();
    const { expanded, toggleExpand } = itemCtx;
    const form = useDykeForm();
    const rowIndex = item.rowIndex;
    async function deleteSection() {
        const itemData = item.get.data();
        // console.log(itemData);
        await _deleteDykeItem(itemData?.item?.id);
        dykeCtx.itemArray.remove(item.rowIndex);
        setTimeout(() => {
            form.setValue("priceRefresh" as any, generateRandomString());
        }, 500);
    }
    function move(to) {
        dykeCtx.itemArray.move(rowIndex, to);
    }
    return (
        <div className="flex bg-accent p-2 px-4 justify-between">
            <CollapsibleTrigger asChild>
                <div
                    className="w-[500px] "
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <FormInput
                        className="w-full"
                        size="sm"
                        control={form.control}
                        name={`itemArray.${item.rowIndex}.item.dykeDescription`}
                        placeholder={` Item ${Number(item.rowIndex) + 1}`}
                    />
                </div>
                {/* <Label className="text-base uppercase font-bold">
                    Item {Number(item.rowIndex) + 1}
                </Label> */}
            </CollapsibleTrigger>
            <div className="flex items-center justify-between space-x-2">
                <Button onClick={toggleExpand} size={"sm"} className="h-8">
                    {expanded ? "Collapse" : "Expand"}
                </Button>
                <Button
                    onClick={deleteSection}
                    className="p-0 h-6 w-6"
                    variant={"destructive"}
                >
                    <Icons.trash className="size-4" />
                </Button>

                {dykeCtx.superAdmin && (
                    <Menu variant={"ghost"}>
                        <MenuItem
                            SubMenu={
                                <div className="grid grid-cols-5 gap-1">
                                    {Array(dykeCtx.itemArray.fields.length)
                                        .fill(null)
                                        .map((_, pos) => (
                                            <MenuItem
                                                key={pos}
                                                className="w-10 inline-flex justify-center"
                                                disabled={pos == rowIndex}
                                                onClick={() => move(pos)}
                                            >
                                                <span className="">
                                                    {pos + 1}
                                                </span>
                                            </MenuItem>
                                        ))}
                                </div>
                            }
                            Icon={Icons.move2}
                        >
                            Move To
                        </MenuItem>
                    </Menu>
                )}
            </div>
        </div>
    );
}
