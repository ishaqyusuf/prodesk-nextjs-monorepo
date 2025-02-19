import Button from "@/components/common/button";
import { ComponentImg } from "../component-img";
import { HptContext, useCtx } from "./ctx";
import { openDoorSwapModal } from "../modals/door-swap-modal";

interface DoorProps {
    door: HptContext["doors"][number];
}
export function Door({ door }: DoorProps) {
    const ctx = useCtx();

    return (
        <div className="flex gap-4s flex-col h-full items-center">
            <div className="">
                <Button
                    onClick={() => {
                        openDoorSwapModal(door, ctx.ctx.itemUid);
                    }}
                >
                    Change Door
                </Button>
            </div>
            <div className="w-2/3">
                <ComponentImg noHover aspectRatio={0.7} src={door.img} />
            </div>
        </div>
    );
}
