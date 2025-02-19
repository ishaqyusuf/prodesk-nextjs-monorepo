import { Button } from "@/components/ui/button";
import { useFormDataStore } from "../_common/_stores/form-data-store";
import { StepSection } from "./step-section";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import ConfirmBtn from "@/components/_v1/confirm-btn";

import ItemSideView from "./item-side-view";
import { useMemo } from "react";
import { ItemClass } from "../_utils/helpers/zus/item-class";
import { Menu } from "@/components/(clean-code)/menu";
import { swap } from "@/lib/utils";

interface Props {
    uid?: string;
}
export default function ItemSection({ uid }: Props) {
    const zus = useFormDataStore();
    const zItem = zus?.kvFormItem?.[uid];

    const sequence = useMemo(() => {
        return zus.sequence?.stepComponent?.[uid];
    }, [zus.sequence?.stepComponent?.[uid]]);

    return (
        <div className="mb-2 sm:mb-4 bg-background rounded-lg">
            <Collapsible
                open
                onOpenChange={(e) => {
                    zus.toggleItem(uid);
                }}
            >
                <ItemSectionHeader uid={uid} />
                <CollapsibleContent className="flex border overflow-auto max-h-[120vh]">
                    <div className="flex-1 flex flex-col ">
                        {sequence?.map((stepUid, index) => (
                            <StepSection
                                isFirst={index == 0}
                                isLast={sequence?.length - 1 == index}
                                key={index}
                                stepUid={stepUid}
                            />
                        ))}
                    </div>
                    <ItemSideView itemUid={uid} />
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
}
function ItemSectionHeader({ uid }) {
    const zus = useFormDataStore();
    const cls = useMemo(() => {
        const cls = new ItemClass(uid);
        return cls;
    }, [uid]);
    const placeholder = `Item ${cls.itemIndex + 1}`;
    const formItem = cls.formItem;
    const itemSequence = zus.sequence.formItem;
    return (
        <div className="flex border items-center gap-4 p-2 px-4">
            <CollapsibleTrigger asChild className="flex-1">
                <div
                    className="flex "
                    onClick={(e) => {
                        e.preventDefault();
                    }}
                >
                    <Input
                        value={formItem?.title}
                        onChange={(e) => {
                            zus.updateFormItem(uid, "title", e.target.value);
                        }}
                        className="h-8 uppercase"
                        placeholder={placeholder}
                    />
                </div>
            </CollapsibleTrigger>
            <Button
                onClick={() => {
                    zus.updateFormItem(uid, "collapsed", !formItem.collapsed);
                }}
                className="h-8"
                size="sm"
                variant={formItem?.collapsed ? "default" : "secondary"}
            >
                {formItem.collapsed ? "Expand" : "Collapse"}
            </Button>
            <Menu>
                <Menu.Item icon="copy">Make Copy</Menu.Item>
                <Menu.Item
                    disabled={itemSequence?.length <= 1}
                    icon="move2"
                    SubMenu={itemSequence?.map((seq, ind) => (
                        <Menu.Item
                            onClick={() => {
                                let sequence = zus.sequence.formItem;
                                let currentIndex = cls.itemIndex;
                                let newIndex = ind;
                                swap(sequence, currentIndex, newIndex);
                                zus.dotUpdate("sequence.formItem", sequence);
                            }}
                            key={seq}
                            disabled={ind == cls.itemIndex}
                        >
                            {ind + 1}
                        </Menu.Item>
                    ))}
                >
                    Move To
                </Menu.Item>
            </Menu>
            <ConfirmBtn
                trash
                size="icon"
                onClick={() => {
                    cls.deleteItem();
                }}
            />
        </div>
    );
}
