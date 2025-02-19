"use client";

import { ModalName } from "@/store/slicers";
import { Button } from "../../ui/button";
import { MenuIcon, MoreHorizontal } from "lucide-react";
import { openModal } from "@/lib/modal";
import { useModal } from "@/components/common/modal/provider";
import MobileMenuCtx from "./mobile-menu-ctx";

interface Props {
    data;
}
export default function MobileMenuBtn({ data }: Props) {
    const modal = useModal();
    return (
        <Button
            onClick={() => {
                modal.openSheet(<MobileMenuCtx item={data} />);
            }}
            size="icon"
            className="p-0 h-5 w-5"
            variant={"secondary"}
        >
            <MoreHorizontal className="size-4" />
        </Button>
    );
}
