"use client";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ISalesWizardForm } from "@/types/post";
import Btn from "@/components/_v1/btn";

export default function WizardForm({
    form,
    open,
    setOpen,
    save,
    fields,
}: {
    open;
    append;
    setOpen;
    save;
    fields;
    form: UseFormReturn<{
        rowIndex;
        wizard: ISalesWizardForm;
    }>;
}) {
    const watchType = form.watch("wizard.inputType");
    const watchCost = form.watch("wizard.hasCost");
    const watchUUID = form.watch("wizard.uuid");
    const watchDepUid = form.watch("wizard.depId");
    const [depsList, setDepsList] = useState<{ label; value }[]>([]);
    useEffect(() => {
        const _depList: { label; value }[] = [];
        fields.map(({ uuid: value, label }) => {
            _depList.push({ label, value });
        });
        setDepsList(_depList);
    }, [fields, watchUUID]);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle>Door Wizard Input</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <FormField
                                control={form.control}
                                name="wizard.label"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Input Title</FormLabel>
                                        <FormControl>
                                            <Input className="h-8" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="wizard.category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input className="h-8" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="wizard.inputType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Input Type</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="h-8">
                                                <SelectValue placeholder="Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {["Text", "Checkbox"].map(
                                                        (opt, _) => (
                                                            <SelectItem
                                                                key={_}
                                                                value={opt}
                                                            >
                                                                {opt}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="col-span-1 grid grid-cols-2 gap-2">
                            <FormField
                                control={form.control}
                                name="wizard.hasQty"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={
                                                    field.value as CheckedState
                                                }
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Qty</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="wizard.hasCost"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Cost</FormLabel>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className=""></div>
                        {watchType == "Checkbox" && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="wizard.depId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Checked Value</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-8"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="wizard.uncheckedValue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Unchecked Value
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="h-8"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                        {watchType == "Text" && (
                            <FormField
                                control={form.control}
                                name="wizard.defaultPrintValue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Default Print Value
                                        </FormLabel>
                                        <FormControl>
                                            <Input className="h-8" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                        {watchCost && (
                            <FormField
                                control={form.control}
                                name="wizard.depId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cost Dependency</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="h-8">
                                                    <SelectValue placeholder="" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        {depsList.map(
                                                            (opt, _) => (
                                                                <SelectItem
                                                                    key={_}
                                                                    value={
                                                                        opt.value
                                                                    }
                                                                >
                                                                    {opt.label}
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                </Form>
                <DialogFooter>
                    <Btn onClick={save} size="sm" type="submit">
                        Save
                    </Btn>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
