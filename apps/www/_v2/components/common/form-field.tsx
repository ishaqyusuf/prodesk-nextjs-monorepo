import { useFormContext } from "react-hook-form";
import {
    FormControl,
    FormDescription,
    FormField as ShadFormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";

interface Props {
    name;
    label?;
    Control;
}
export default function FormField({ name, label, Control }: Props) {
    const form = useFormContext();

    return (
        <ShadFormField
            name={name}
            control={form.control}
            render={({ field }) => (
                <FormItem className="">
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        {Control && <Control field={field} />}
                    </FormControl>
                </FormItem>
            )}
        />
    );
}
