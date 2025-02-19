import { createContext, useContext } from "react";

interface Props {
    price;
    rate;
    qty;
    baseKey;
    profitRate;
    profileEstimate;
    mockPercent;
}
export const InvoiceItemRowContext = createContext<Props>({} as any);
