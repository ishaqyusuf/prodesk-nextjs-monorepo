import { useItemProdView } from "./use-hooks";
import { Icons } from "@/components/_v1/icons";
import { createContext, useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormSelect from "@/components/common/controls/form-select";
import { getSalesProdWorkersAsSelectOption } from "../../../use-case/sales-prod-workers-use-case";
import useEffectLoader from "@/lib/use-effect-loader";
import Button from "@/components/common/button";
import { DatePicker } from "@/components/(clean-code)/custom/controlled/date-picker";
import NumberPicker from "@/components/(clean-code)/custom/controlled/number-picker";
import {
    createItemAssignmentUseCase,
    getItemAssignmentFormUseCase,
    ItemAssignmentForm,
} from "../../../use-case/sales-prod.use-case";
import { toast } from "sonner";

function useAssignmentCtx() {
    const ctx = useItemProdView();
    const { item } = ctx;
    const [assignMode, setAssignMode] = useState(false);
    const pendingAssignments = item?.analytics?.pending?.assignment;
    const form = useForm<ItemAssignmentForm>({
        defaultValues: null,
    });
    useEffect(() => {
        if (assignMode) {
            getItemAssignmentFormUseCase(item).then((res) => {
                form.reset(res);
            });
        }
    }, [assignMode]);

    async function save() {
        const formData = form.getValues();
        // console.log(formData);
        await createItemAssignmentUseCase(
            formData,
            item.analytics.control.produceable
        );

        toast.success("Created!");
        ctx.mainCtx.refresh();
    }
    return {
        save,
        setAssignMode,
        item,
        assignMode,
        form,
        pending: pendingAssignments,
    };
}
const Context = createContext<ReturnType<typeof useAssignmentCtx>>(null as any);
export function AssignForm({}) {
    const ctx = useAssignmentCtx();
    const { item, setAssignMode, assignMode, pending } = ctx;

    return (
        <Context.Provider value={ctx}>
            <Button
                onClick={() => {
                    setAssignMode(true);
                }}
                disabled={pending?.total == 0}
                variant="default"
                className={cn(
                    "w-full",
                    assignMode || (!pending.total && "hidden")
                )}
            >
                <Icons.add className="w-5 h-5 mr-2" />
                <span>Assign</span>
                <span>({pending?.total})</span>
            </Button>
            {assignMode && <AssignmentForm />}
        </Context.Provider>
    );
}
function AssignmentForm({}) {
    const ctx = useContext(Context);
    const { form, pending, item } = ctx;
    const workers = useEffectLoader(getSalesProdWorkersAsSelectOption);
    return (
        <Form {...ctx.form}>
            <div className="border rounded-lg bg-white mt-4">
                <div className="grid p-4 sm:grid-cols-2 gap-4 items-end">
                    <FormSelect
                        size="sm"
                        options={workers?.data || []}
                        label={"Assign To"}
                        name="assignedTo.connect.id"
                        control={form.control}
                    />
                    <DatePicker
                        control={form.control}
                        name="dueDate"
                        size="sm"
                        label="Due Date"
                    />
                    {(item.hasSwing && pending.lh) || pending.qty ? (
                        <NumberPicker
                            control={form.control}
                            name={"lhQty"}
                            size="sm"
                            label={item.hasSwing ? "LH Qty" : "Qty"}
                            length={pending.lh || pending.qty}
                        />
                    ) : (
                        <></>
                    )}
                    {/* <NumberPicker
                        control={form.control}
                        name="lhQty"
                        size="sm"
                        label={pending.lh ? "LH Qty" : "Qty"}
                        length={pending.lh || pending.qty}
                    /> */}
                    {pending.rh ? (
                        <NumberPicker
                            control={form.control}
                            name="rhQty"
                            size="sm"
                            label="RH Qty"
                            length={pending.rh}
                        />
                    ) : null}
                </div>
                <div className="justify-end  flex gap-4 border-t p-4">
                    <Button
                        onClick={() => {
                            ctx.setAssignMode(false);
                        }}
                        size="sm"
                        variant="destructive"
                    >
                        Cancel
                    </Button>
                    <Button action={ctx.save} size="sm" variant="default">
                        Assign
                    </Button>
                </div>
            </div>
        </Form>
    );
}
