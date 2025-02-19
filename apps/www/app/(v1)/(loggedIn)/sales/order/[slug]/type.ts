import { getOrderAction } from "@/app/(v1)/(loggedIn)/sales/_actions/sales";
import { ServerPromiseType } from "@/types";

export type SalesOverview = ServerPromiseType<
    typeof getOrderAction
>["Response"];
