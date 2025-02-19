"use client";

import { Icons } from "@/components/_v1/icons";
import Portal from "@/components/_v1/portal";
import Button from "@/components/common/button";
import { ExportTypes } from "./type";
import { useExport } from "./use-export";
import { Menu } from "../../../../components/(clean-code)/menu";
import { useModal } from "@/components/common/modal/provider";
import ExportModal from "./export-modal";

interface Props {
    type: ExportTypes;
}
export default function TableExport({ type }: Props) {
    // return <>abc</>;
    const ctx = useExport(type);
    const modal = useModal();
    function openExport() {
        modal.openModal(<ExportModal type={type} />);
    }
    return (
        <Portal nodeId={"tableExport"}>
            {ctx?._exports?.length > 0 ? (
                <>
                    <Menu
                        Icon={Icons.Export}
                        label={"Export"}
                        variant="default"
                    >
                        <Menu.Item>Item 1</Menu.Item>
                    </Menu>
                </>
            ) : (
                <Button size="sm" onClick={openExport} className="h-8">
                    <Icons.Export className="size-4 mr-2" />
                    Export
                </Button>
            )}
        </Portal>
    );
}
