"use client";

import { DatePicker } from "@/components/_v1/date-range-picker";
import Modal from "@/components/common/modal";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { PayableProm } from "../../accounting/payables/payable-tables";
import { updateDueDateAction } from "./update-due-date";
import { toast } from "sonner";
import { useModal } from "@/components/common/modal/provider";
import { _revalidate } from "@/app/(v1)/_actions/_revalidate";

interface Props {
    item: PayableProm["Item"];
}
export default function DueDateModal({ item }: Props) {
    const [date, setDate] = useState<any>(item.goodUntil);
    const modal = useModal();
    async function update() {
        await updateDueDateAction(item.id, date);
        toast.success("Due date updated");
        modal.close();
        await _revalidate("payables");
    }
    return (
        <Modal.Content size={"sm"}>
            <Modal.Header title="Invoice Due Date" />
            <div className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </div>
            <Modal.Footer submitText="Update" onSubmit={update} />
        </Modal.Content>
    );
}
