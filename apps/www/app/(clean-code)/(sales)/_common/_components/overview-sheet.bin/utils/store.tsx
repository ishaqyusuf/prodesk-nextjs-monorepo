import { dotSet } from "@/app/(clean-code)/_common/utils/utils";
import { FieldPath, FieldPathValue } from "react-hook-form";
import { create } from "zustand";
import {
    getSalesItemOverviewUseCase,
    GetSalesOverview,
} from "../../../use-case/sales-item-use-case";
import { _modal } from "@/components/common/modal/provider";
import { SalesType } from "@/app/(clean-code)/(sales)/types";

const data = {
    overview: null as any as GetSalesOverview,
    adminMode: false,
    orderId: null,
    id: null,
    type: null as SalesType,
    expandProdItemUID: null, //grpIndex-prodIndex
};
type Action = ReturnType<typeof funcs>;
type Data = typeof data;
type CustomerStore = Data & Action;
export type ZusFormSet = (update: (state: Data) => Partial<Data>) => void;

function funcs(set: ZusFormSet) {
    return {
        // toggleItem: (uid) => set((state) => ({})),
        reset: (resetData) =>
            set((state) => ({
                ...data,
                ...resetData,
                // orderId,
                // adminMode,
            })),
        dotUpdate: <K extends FieldPath<Data>>(
            k: K,
            v: FieldPathValue<Data, K>
        ) =>
            set((state) => {
                const newState = {
                    ...state,
                };
                const d = dotSet(newState);
                d.set(k, v);
                return newState;
            }),
    };
}
export const zSalesOverview = create<CustomerStore>((set) => ({
    ...data,
    ...funcs(set),
}));
export function loadSalesOverviewer({
    Modal,
    ...data
}: Partial<Data> & { Modal? }) {
    const z = zSalesOverview.getState();
    z.reset({
        ...data,
    });
    getSalesItemOverviewUseCase(data.id || data.orderId, data.type).then(
        (result) => {
            z.dotUpdate("overview", result);
            // z.dotUpdate('orderId',result.info)
            if (Modal) _modal.openModal(<Modal />);
        }
    );
}
