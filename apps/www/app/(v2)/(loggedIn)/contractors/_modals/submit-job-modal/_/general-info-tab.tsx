import useSubmitJob, { useJobSubmitCtx } from "./use-submit-job";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SelectControl from "@/_v2/components/common/select-control";
import { useStaticContractors } from "@/_v2/hooks/use-static-data";

export default function GeneralInfoTab() {
    const ctx = useJobSubmitCtx();

    const contractors = useStaticContractors();
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <CustomInput
                label="Job Title"
                name="job.title"
                disabled={ctx.getValues("job.projectId") != null}
            />
            <CustomInput
                label="Description"
                name="job.subtitle"
                disabled={ctx.getValues("job.homeId") != null}
            />
            <CustomInput
                label="Additional Cost ($)"
                name="job.meta.additional_cost"
                type="number"
            />
            <CustomInput label="Reason" name="job.description" />
            <div className="col-span-2">
                <CustomInput label="Report" name="job.note" textarea />
            </div>
            <SelectControl
                name="job.coWorkerId"
                options={[
                    ...(contractors?.data || [])?.map((c) => ({
                        text: c.name,
                        value: c.id,
                    })),
                ]}
                label="Co Worker"
            />
        </div>
    );
}
interface Props {
    label;
    name;
    disabled?: boolean;
    textarea?: boolean;
    type?;
}
function CustomInput({ label, name, disabled, type, textarea }: Props) {
    const ctx = useJobSubmitCtx();
    return (
        <FormField
            name={name as any}
            control={ctx.form.control}
            render={({ field, fieldState }) => (
                <FormItem>
                    {label && (
                        <FormLabel>
                            <Label>{label}</Label>
                        </FormLabel>
                    )}
                    <FormControl>
                        {textarea ? (
                            <Textarea {...field} />
                        ) : (
                            <Input
                                disabled={disabled}
                                type={type}
                                {...field}
                                className={cn(
                                    "h-8",
                                    fieldState.error && "border-red-400"
                                )}
                            />
                        )}
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
