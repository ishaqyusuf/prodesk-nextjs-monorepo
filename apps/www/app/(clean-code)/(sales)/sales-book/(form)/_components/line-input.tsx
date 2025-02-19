import { Input, InputProps } from "@/components/ui/input";
import {
    useFormDataStore,
    ZusGroupItemFormPath,
} from "../_common/_stores/form-data-store";
import { GroupFormClass } from "../_utils/helpers/zus/group-form-class";
import { FieldPath } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

interface LineInputProps {
    lineUid;
    name: FieldPath<ZusGroupItemFormPath>;
    cls: GroupFormClass;
    valueChanged?;
}
export function LineInput({
    lineUid,
    name,
    cls,
    valueChanged,
    ...props
}: LineInputProps & InputProps) {
    // const state = useFormDataStore();
    const value = cls.dotGetGroupItemFormValue(lineUid, name);
    return (
        <Input
            className="h-8 uppercase"
            {...props}
            defaultValue={value as any}
            onChange={(e) => {
                const val =
                    props.type == "number" ? +e.target.value : e.target.value;
                cls.dotUpdateGroupItemFormPath(lineUid, name, val);

                valueChanged?.(val);
            }}
        />
    );
}
export function LineSwitch({
    lineUid,
    name,
    cls,
    valueChanged,
}: LineInputProps) {
    const value = cls.dotGetGroupItemFormValue(lineUid, name);

    return (
        <>
            <Switch
                defaultChecked={value as any}
                onCheckedChange={(e) => {
                    cls.dotUpdateGroupItemFormPath(lineUid, name, e);
                    valueChanged?.(e);
                }}
            />
        </>
    );
}
