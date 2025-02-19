import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { InputHTMLAttributes } from "react";

interface Props<T> {
    label?: string;
    placeholder?: string;
    className?: string;
    suffix?: string;
    type?: string;
    list?: boolean;
    size?: "sm" | "default" | "xs";
    prefix?: string;
    tabIndex?;
    uppercase?: boolean;
    inputProps?: InputHTMLAttributes<HTMLInputElement>;
    // defaultValue?:boolean
}
export default function FormInput<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TOptionType = any
>({
    label,
    placeholder,
    className,
    suffix,
    type,
    list,
    prefix,
    uppercase,
    tabIndex,
    size = "default",
    inputProps,
    ...props
}: Partial<ControllerProps<TFieldValues, TName>> & Props<TOptionType>) {
    return (
        <FormField
            {...(props as any)}
            render={({ field, fieldState }) => (
                <FormItem className={cn(className, "mx-1")}>
                    {label && (
                        <FormLabel
                            className={cn(fieldState.error && "border-red-400")}
                        >
                            {label}
                        </FormLabel>
                    )}
                    <FormControl {...inputProps}>
                        <div
                            className={cn(
                                (suffix || prefix) &&
                                    "flex items-center space-x-1",
                                ""
                            )}
                        >
                            {prefix && (
                                <div
                                    className={cn(
                                        size == "sm" && "",
                                        "sbg-muted-foreground/50 text-sm px-1 h-full"
                                    )}
                                >
                                    {prefix}
                                </div>
                            )}
                            {type == "textarea" ? (
                                <Textarea
                                    tabIndex={tabIndex}
                                    placeholder={placeholder}
                                    className={cn(
                                        fieldState.error && "border-red-400"
                                    )}
                                    {...(list
                                        ? {
                                              defaultValue: field.value,
                                              onChange: field.onChange,
                                          }
                                        : field)}
                                    // value={""}
                                />
                            ) : (
                                <Input
                                    tabIndex={tabIndex}
                                    type={type}
                                    placeholder={placeholder}
                                    // {...field}
                                    // value={""}
                                    {...inputProps}
                                    className={cn(
                                        uppercase && "uppercase",
                                        fieldState.error && "border-red-400",
                                        size == "sm" && "h-8"
                                    )}
                                    {...(list
                                        ? {
                                              defaultValue: field.value,
                                              //   onChange: field.onChange,
                                          }
                                        : field)}
                                    // onChange={field.onChange}
                                    // defaultValue={field.value}
                                    onChange={(e) => {
                                        if (type == "number")
                                            e.target.value
                                                ? field.onChange(
                                                      e.target.value
                                                          ? Number(
                                                                e.target.value
                                                            )
                                                          : null
                                                  )
                                                : field.onChange(null);
                                        else field.onChange(e);
                                    }}
                                />
                            )}
                            {suffix && (
                                <Button
                                    type="button"
                                    size={size as any}
                                    variant={"outline"}
                                    className={size == "sm" && "h-8"}
                                >
                                    {suffix}
                                </Button>
                            )}
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
