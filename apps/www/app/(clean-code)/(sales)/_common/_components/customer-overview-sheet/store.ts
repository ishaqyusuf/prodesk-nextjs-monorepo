import { dotObject, dotSet } from "@/app/(clean-code)/_common/utils/utils";
import { FieldPath, FieldPathValue } from "react-hook-form";
import { create } from "zustand";
import { GetCustomerOverviewUseCase } from "../../use-case/customer-use-case";

const defaultValues = {
    loading: true,
    tab: "sales",
};
const data: GetCustomerOverviewUseCase & typeof defaultValues = {
    ...defaultValues,
} as any;
type Action = ReturnType<typeof funcs>;
type Data = typeof data;
type CustomerStore = Data & Action;
export type ZusFormSet = (update: (state: Data) => Partial<Data>) => void;

function funcs(set: ZusFormSet) {
    return {
        tabChanged: (tab) =>
            set((state) => {
                return {
                    ...state,
                    tab,
                };
            }),
        clear: () =>
            set((state) => {
                return data;
            }),
        initialize: (data) =>
            set((state) => {
                return {
                    loading: false,
                    tab: "sales",
                    ...data,
                };
            }),
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
export const customerStore = create<CustomerStore>((set) => ({
    ...data,
    ...funcs(set),
}));
