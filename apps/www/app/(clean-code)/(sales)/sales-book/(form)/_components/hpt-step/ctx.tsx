import { createContext, useContext, useEffect, useMemo } from "react";
import { useFormDataStore } from "../../_common/_stores/form-data-store";
import { HptClass } from "../../_utils/helpers/zus/hpt-class";
export const Context = createContext<HptContext>(null as any);
export const useCtx = () => useContext(Context);
export type HptContext = ReturnType<typeof useCreateContext>;
export const useCreateContext = (itemStepUid) => {
    const zus = useFormDataStore();
    const [itemUid] = itemStepUid.split("-");
    const ctx = useMemo(() => {
        const ctx = new HptClass(itemStepUid);
        const itemForm = ctx.getItemForm();

        return {
            zus,
            ctx,
            itemForm,
            ...ctx.getHptForm(),
        };
    }, [itemStepUid, zus.kvFormItem?.[itemUid]?.swapUid]);
    useEffect(() => {
        let tuid = ctx.ctx.tabUid;
        if (ctx.doors.every((s) => s.uid != ctx.ctx.tabUid)) {
            // console.log(ctx.doors?.[0]?.uid);
            tuid = ctx.doors?.[0]?.uid;
            ctx.ctx.dotUpdateItemForm(
                "groupItem._.tabUid",
                ctx.doors?.[0]?.uid
            );
        }
    }, [ctx.doors]);
    return {
        ...ctx,
        itemUid: ctx.ctx.itemUid,
    };
};
