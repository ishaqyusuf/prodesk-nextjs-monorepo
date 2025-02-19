import { useDataPage } from "@/lib/data-page-context";
import { SalesOverviewType } from "../overview-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DykeDoorItems from "./dyke-door-items";

export default function SalesItemsOverview() {
    const { data } = useDataPage<SalesOverviewType>();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
                <DykeDoorItems />
            </CardContent>
        </Card>
    );
}
