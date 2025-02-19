import { Button } from "@/components/ui/button";
import { useQueryTabStore } from "./data-store";
import { Icons } from "@/components/_v1/icons";
import { _modal } from "@/components/common/modal/provider";
import Modal from "@/components/common/modal";
import { useForm } from "react-hook-form";

export function QueryTabAction({}) {
    const t = useQueryTabStore();
    if (t?.pageInfo?.links?.length < 2) return null;
    return (
        <Button
            onClick={() => {
                _modal.openModal(<QueryTabModal />);
            }}
            variant="outline"
        >
            <Icons.settings className="mr-2 size-4" />
            <span>Tab</span>
        </Button>
    );
}
function QueryTabModal({}) {
    const store = useQueryTabStore();
    const form = useForm({
        defaultValues: {
            tabs: store.pageInfo?.links,
        },
    });

    return <Modal.Content></Modal.Content>;
}
