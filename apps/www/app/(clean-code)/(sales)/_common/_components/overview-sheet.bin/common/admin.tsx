import { zSalesOverview } from "../utils/store";

export function Admin({ children = null }) {
    const z = zSalesOverview();
    if (z.adminMode) return children;
    return null;
}
