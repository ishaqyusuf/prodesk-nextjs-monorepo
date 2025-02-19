"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
interface Props<T> {
    label?: string;
    placeholder?: string;
    description?: string;
    className?: string;
    // suffix?: string;
    // type?: string;
    list?: boolean;
    size?: "sm" | "default" | "xs";
    prefix?: string;
    // defaultValue?:boolean
}
export function DatePicker<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
    TOptionType = any
>({
    label,
    placeholder,
    size,
    description,
    ...props
}: Partial<ControllerProps<TFieldValues, TName>> & Props<TOptionType>) {
    // const [date, setDate] = React.useState<Date>();
    const [opened, setOpened] = React.useState(false);
    return (
        <FormField
            {...(props as any)}
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    {label && <FormLabel>{label}</FormLabel>}
                    <Popover open={opened} onOpenChange={setOpened}>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        " pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground",
                                        size == "sm" && "h-8"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>
                                            {placeholder || "Pick a date"}
                                        </span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(e) => {
                                    field.onChange(e);
                                    setTimeout(() => {
                                        setOpened(false);
                                    }, 100);
                                }}
                                // disabled={(date) =>
                                //     date > new Date() ||
                                //     date < new Date("1900-01-01")
                                // }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {description && (
                        <FormDescription>{description}</FormDescription>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
