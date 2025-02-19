import { Menu } from "@/components/(clean-code)/menu";
import { useFormDataStore } from "../../_common/_stores/form-data-store";
import { UseStepContext } from "./ctx";
import { useState } from "react";

export function CustomComponentAction({ ctx }: { ctx: UseStepContext }) {
    const zus = useFormDataStore();
    const stepForm = ctx.cls.getStepForm();
    const [customMode, setCustomMode] = useState(stepForm?.meta?.custom);
    // useEffect(() => {
    //     setCustomMode(stepForm?.meta?.custom);
    // }, []);
    return (
        <Menu.Item onClick={() => {}} icon="add">
            {customMode ? "Disable Custom" : "Enable Custom"}
        </Menu.Item>
    );
}
