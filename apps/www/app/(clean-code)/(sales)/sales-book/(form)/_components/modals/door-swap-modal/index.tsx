import Modal from "@/components/common/modal";
import { _modal } from "@/components/common/modal/provider";
import { HptContext } from "../../hpt-step/ctx";
import { Component } from "../../components-section";
import { useStepContext } from "../../components-section/ctx";
import { getFormState } from "../../../_common/_stores/form-data-store";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

export type Door = HptContext["doors"][number];
export const openDoorSwapModal = (door: Door, itemUid) => {
    const zus = getFormState();
    const itemStepUid = Object.entries(zus.kvStepForm)?.find(
        ([k, v]) => v.title == "Door" && k?.startsWith(itemUid)
    )?.[0];
    if (itemStepUid)
        _modal.openModal(
            <DoorSwapModal itemStepUid={itemStepUid} door={door} />
        );
    else toast.error("Door step not found");
};
export function DoorSwapModal({ door, itemStepUid }) {
    const ctx = useStepContext(itemStepUid);
    const { items, sticky, cls, props } = ctx;
    return (
        <Modal.Content size="xl">
            <Modal.Header title="Select Door" />
            <div className="">
                {/* <ComponentsSection itemStepUid={itemStepUid} /> */}
                <ScrollArea className="h-[85vh]">
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-3">
                        {items?.map((component) => (
                            <Component
                                ctx={ctx}
                                key={component.uid}
                                component={component}
                                swapDoor={door}
                            />
                        ))}
                    </div>
                </ScrollArea>
            </div>
        </Modal.Content>
    );
}
