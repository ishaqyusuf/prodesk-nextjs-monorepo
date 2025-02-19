import FormInput from "@/components/common/controls/form-input";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";

interface Props<T> {
    label?: string;
    size?: "sm" | "default" | "xs";
    length;
    startIndex?: number;
    disabled?: boolean;
    inline?: boolean;
}
export default function NumberPicker<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TOptionType = any
>({
    label,
    size,
    length,
    disabled,
    startIndex = 1,
    inline,
    ...props
}: Partial<ControllerProps<TFieldValues, TName>> & Props<TOptionType>) {
    const inputs = Array(length)
        .fill(null)
        ?.map((_, i) => startIndex + i);
    // if (inputs.length > 10) return <FormInput {...(props as any)} />;
    return (
        <FormField
            {...(props as any)}
            render={({ field }) => (
                <FormItem
                    className={cn(
                        "flex",
                        !inline ? "flex-col" : " items-center space-y-0 gap-2"
                    )}
                >
                    <div className="flex items-center gap-2">
                        {label && <FormLabel>{label}</FormLabel>}
                        <div className="flex-1"></div>

                        <Button
                            disabled={field.value == null}
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                field.onChange(null);
                            }}
                            className="h-8 font-mono uppercase"
                        >
                            Clear
                        </Button>
                    </div>
                    <FormControl className="flex items-center">
                        <div className="flex gap-2s flex-wrap items-center">
                            {disabled && !inputs.length ? (
                                <Button disabled></Button>
                            ) : null}
                            {inputs.map((i) => (
                                <Button
                                    className="border-nones h-8 font-mono rounded-full text-xs font-bold"
                                    disabled={disabled}
                                    variant={
                                        (field.value || 0) >= i
                                            ? "default"
                                            : "secondary"
                                    }
                                    onClick={() => {
                                        field.onChange(i);
                                    }}
                                    key={i}
                                    size={size as any}
                                >
                                    {i}
                                </Button>
                            ))}
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
