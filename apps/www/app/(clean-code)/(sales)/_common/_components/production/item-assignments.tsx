import { Badge } from "@/components/ui/badge";
import { useSalesItem } from "./item-production-card";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/use-day";
import Button from "@/components/common/button";
import { Label } from "@/components/ui/label";
import ConfirmBtn from "@/components/_v1/confirm-btn";
import { Admin } from "../overview-sheet.bin/common/admin";
import { createContext, useContext, useEffect, useState } from "react";
import { DatePicker } from "@/components/_v1/date-range-picker";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Menu } from "@/components/(clean-code)/menu";
import {
    deleteAssignmentSubmissionUseCase,
    deleteAssignmentUseCase,
    submitAssignmentUseCase,
    updateAssignmentDueDateUseCase,
} from "../../use-case/sales-prod.use-case";
import { toast } from "sonner";
import { zSalesOverview } from "../overview-sheet.bin/utils/store";
import { SubmitForm } from "./submit-form";
import { LineAssignment } from "../../data-access/dto/sales-item-dto";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function ItemAssignments({}) {
    const ctx = useSalesItem();

    return (
        <div>
            <div className="border-b">
                <Label className="font-mono">Assignments</Label>
            </div>
            {ctx.item.assignments?.map((assignment, index) => (
                <Assignment key={index} index={index} assignment={assignment} />
            ))}
        </div>
    );
}
const AssignmentContext = createContext<ReturnType<typeof useAssingmentCtx>>(
    null as any
);
function useAssingmentCtx(assignment: LineAssignment) {
    const [submit, setSubmit] = useState(false);
    const pending = assignment.pending;
    console.log(pending);

    const form = useForm({
        resolver: zodResolver(
            z.object({
                qty: z
                    .number()
                    .min(0)
                    .max(pending?.qty || 0),
                lhQty: z
                    .number()
                    .min(0)
                    .max(pending?.lh || 0),
                rhQty: z
                    .number()
                    .min(0)
                    .max(pending?.rh || 0),
                note: z.string().nullable(),
            })
        ),
        defaultValues: {
            qty: pending.qty,
            lhQty: pending.lh,
            rhQty: pending.rh,
            note: "",
        },
    });
    useEffect(() => {
        if (submit) {
            form.reset({
                qty: assignment?.pending?.qty || 0,
                rhQty: assignment?.pending?.rh || 0,
                lhQty: assignment?.pending?.lh || 0,
                note: "",
            });
        }
    }, [submit]);
    return {
        submit,
        setSubmit,
        assignment,
        form,
    };
}
export const useAssignment = () => useContext(AssignmentContext);
function Assignment({ assignment, index }) {
    const ctx = useAssingmentCtx(assignment);
    const itemCtx = useSalesItem();
    return (
        <AssignmentContext.Provider value={ctx}>
            <div className="" key={assignment.id}>
                <div className="flex border-b font-mono items-center p-1 gap-4">
                    <div>
                        {index + 1}. {assignment.assignedTo}
                    </div>
                    <DueDate assignment={assignment} />
                    <SubmissionStatusPill assignmentIndex={index} qtyKey="lh" />
                    <SubmissionStatusPill assignmentIndex={index} qtyKey="rh" />
                    <SubmissionStatusPill
                        assignmentIndex={index}
                        qtyKey="qty"
                    />
                    <div className="flex-1"></div>
                    <div className="items-center flex gap-1">
                        <Button
                            onClick={() => {
                                ctx.setSubmit(true);
                            }}
                            disabled={!assignment.pending?.total || ctx.submit}
                            size="xs"
                        >
                            Submit
                        </Button>
                        <Admin>
                            <ConfirmBtn
                                onClick={async (e) => {
                                    await deleteAssignmentUseCase(
                                        assignment.id,
                                        itemCtx.item?.analytics?.control
                                            ?.produceable
                                    );
                                }}
                                trash
                            />
                        </Admin>
                    </div>
                </div>
                {ctx.submit && <SubmitForm />}
                <div className="mx-4 flex flex-col-reverse sm:mx-8">
                    {assignment.submissions.map((submission) => (
                        <div
                            key={submission.id}
                            className="text-muted-foreground border-b py-1 flex items-center"
                        >
                            <div className="font-mono">
                                {submission.qty?.total} {" items submitted on "}
                                {formatDate(submission.date)}
                            </div>
                            <div className="flex-1"></div>
                            <ConfirmBtn
                                onClick={async (e) => {
                                    await deleteAssignmentSubmissionUseCase(
                                        submission.id,
                                        itemCtx.item?.analytics?.control
                                            ?.produceable
                                    );
                                }}
                                trash
                            />
                        </div>
                    ))}
                </div>
            </div>
        </AssignmentContext.Provider>
    );
}
function DueDate({ assignment }) {
    const ctx = zSalesOverview();
    const [date, setDate] = useState(assignment.dueDate);
    async function changeDueDate(e) {
        updateAssignmentDueDateUseCase(assignment.id, e).then((resp) => {
            toast.success("Updated");
        });
    }
    return (
        <DatePicker
            disabled={!ctx.adminMode}
            className="w-auto"
            setValue={changeDueDate}
            value={date}
        />
    );
    return (
        <Menu
            Trigger={
                <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    {date ? `Due on: ${formatDate(date)}` : "No due date"}
                </Button>
            }
        >
            <Menu.Item>ABC</Menu.Item>
            <Calendar
                initialFocus
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
            />
        </Menu>
    );
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    {date ? ` Due on: ${formatDate(date)}` : "No due date"}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    );
}
function SubmissionStatusPill({
    qtyKey,
    assignmentIndex,
}: {
    qtyKey: "lh" | "rh" | "qty";
    assignmentIndex;
}) {
    const ctx = useSalesItem();
    const assignedQty = ctx.item.assignments?.[assignmentIndex]?.qty?.[qtyKey];
    const completedQty =
        ctx.item.assignments?.[assignmentIndex]?.submitted?.[qtyKey];
    if (!assignedQty) return null;
    return (
        <Badge
            variant="destructive"
            className={cn("uppercase font-mono py-0.5")}
        >
            {`${completedQty}/${assignedQty} ${qtyKey}`}
        </Badge>
    );
}
