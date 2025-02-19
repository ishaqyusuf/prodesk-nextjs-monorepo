import Modal from "@/components/common/modal";
import { useFormDataStore } from "../../../_common/_stores/form-data-store";
import { createContext, useContext, useEffect, useMemo } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/_v1/icons";
import { Form } from "@/components/ui/form";
import FormSelect from "@/components/common/controls/form-select";
import { ComboxBox } from "@/components/(clean-code)/custom/controlled/combo-box";
import ConfirmBtn from "@/components/_v1/confirm-btn";
import { updateStepMetaUseCase } from "@/app/(clean-code)/(sales)/_common/use-case/step-component-use-case";
import { _modal } from "@/components/common/modal/provider";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { StepHelperClass } from "../../../_utils/helpers/zus/step-component-class";
import { Label } from "@/components/ui/label";
import { widthList } from "@/app/(clean-code)/(sales)/_common/utils/contants";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
    cls: StepHelperClass;
}

const Context = createContext<ReturnType<typeof useInitContext>>(null);
const useCtx = () => useContext(Context);
export function useInitContext(cls: StepHelperClass) {
    const zus = useFormDataStore();
    // const variations = cls.getStepForm().meta?.doorSizeVariation;
    const data = cls.getComponentVariantData();
    const step = cls.getStepForm(); // zus.kvStepForm[stepUid];
    const form = useForm({
        defaultValues: {
            meta: step.meta,
        },
    });
    const varArray = useFieldArray({
        control: form.control,
        name: "meta.doorSizeVariation",
    });
    async function save() {
        const resp = await updateStepMetaUseCase(
            step.stepId,
            form.getValues("meta")
        );
        _modal.close();
        toast.success("Door Heights saved.");
        cls.updateStepFormMeta(form.getValues("meta"));
    }
    function addRule() {
        varArray.append({
            rules: [{ componentsUid: [], stepUid: null, operator: "is" }],
        });
    }
    return {
        varArray,
        data,
        step,
        form,
        save,
        addRule,
    };
}
export default function DoorSizeModal({ cls }: Props) {
    const ctx = useInitContext(cls);

    return (
        <Context.Provider value={ctx}>
            <Modal.Content size="lg">
                <Modal.Header
                    title={"Door Size Variations"}
                    subtitle={
                        "Add door size variations rules and selected widths for each composed rule"
                    }
                />
                <Form {...ctx.form}>
                    <ScrollArea
                        tabIndex={-1}
                        className="max-h-[50vh] bg-muted px-4  -mx-4"
                    >
                        {ctx.varArray.fields?.length == 0 ? (
                            <>
                                <div className="">
                                    <span className="text-muted-foreground">
                                        This component has not rules set, which
                                        means it will always be visible in{" "}
                                        <Badge
                                            className="font-mono"
                                            variant="outline"
                                        >
                                            {ctx.step?.title}
                                        </Badge>
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="gap-4 flex flex-col ">
                                {ctx.varArray.fields?.map((field, index) => (
                                    <RuleComponent index={index} key={index} />
                                ))}
                            </div>
                        )}
                        <div className="mt-2">
                            <Button
                                onClick={ctx.addRule}
                                size="sm"
                                className="h-8 text-xs"
                            >
                                <Icons.add className="size-4 mr-2" />
                                <span>Add Rule</span>
                            </Button>
                        </div>
                    </ScrollArea>
                </Form>

                <Modal.Footer submitText="Save" onSubmit={ctx.save} />
            </Modal.Content>
        </Context.Provider>
    );
}
function RuleComponent({ index }) {
    const ctx = useCtx();
    const rulesArray = useFieldArray({
        control: ctx.form.control,
        name: `meta.doorSizeVariation.${index}.rules`,
    });
    function addRuleFilter() {
        rulesArray.append({
            componentsUid: [],
            operator: "is",
            stepUid: null,
        });
    }
    function ComponentInput({ fieldIndex }) {
        const stepUid = ctx.form.watch(
            `meta.doorSizeVariation.${index}.rules.${fieldIndex}.stepUid`
        );
        return (
            <ComboxBox
                maxSelection={999}
                options={ctx.data?.componentsByStepUid[stepUid] || []}
                labelKey="title"
                valueKey="uid"
                className="w-full"
                control={ctx.form.control}
                name={`meta.doorSizeVariation.${index}.rules.${fieldIndex}.componentsUid`}
            />
        );
    }
    return (
        <div className="flex flex-col gap-2 border rounded overflow-y-auto p-2 bg-white">
            {rulesArray?.fields?.map((field, fieldIndex) => (
                <div className="flex items-center gap-2" key={fieldIndex}>
                    <div className="min-w-[4.5rem] text-center">
                        <span className="text-sm text-muted-foreground">
                            {fieldIndex == 0 ? "Where" : "and"}
                        </span>
                    </div>
                    <ComboxBox
                        options={ctx.data?.steps}
                        labelKey="title"
                        valueKey="uid"
                        control={ctx.form.control}
                        name={`meta.doorSizeVariation.${index}.rules.${fieldIndex}.stepUid`}
                    />
                    <div className="min-w-[5rem]">
                        <FormSelect
                            control={ctx.form.control}
                            name={`meta.doorSizeVariation.${index}.rules.${fieldIndex}.operator`}
                            size="sm"
                            options={["is", "isNot"]}
                        />
                    </div>
                    <div className="flex-1">
                        <ComponentInput fieldIndex={fieldIndex} />
                    </div>
                    <ConfirmBtn
                        onClick={(e) => {
                            rulesArray.remove(fieldIndex);
                        }}
                        trash
                        size="icon"
                    />
                </div>
            ))}
            <div className="flex justify-end">
                <Button
                    disabled={rulesArray.fields.length == ctx.data.stepsCount}
                    onClick={addRuleFilter}
                    className="h-7 text-xs"
                >
                    <Icons.add className="size-4 mr-2" />
                    <span>Add Filter</span>
                </Button>
            </div>
            <div className="border-t">
                <Label>Width List</Label>
                <ComboxBox
                    maxSelection={999}
                    maxStack={15}
                    options={widthList.map((label) => ({
                        label,
                        value: label,
                    }))}
                    // labelKey="title"
                    // valueKey="uid"
                    className="w-full"
                    control={ctx.form.control}
                    name={`meta.doorSizeVariation.${index}.widthList`}
                />
            </div>
        </div>
    );
}
