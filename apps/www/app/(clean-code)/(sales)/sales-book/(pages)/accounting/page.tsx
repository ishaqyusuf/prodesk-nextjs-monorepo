import FPage from "@/components/(clean-code)/fikr-ui/f-page";
import SalesAccountingTable from "@/components/tables/sales-accounting";
import TablePage from "@/components/tables/table-page";
import { constructMetadata } from "@/lib/(clean-code)/construct-metadata";

export async function generateMetadata({}) {
    return constructMetadata({
        title: `Accounting - gndprodesk.com`,
    });
}
export default async function Page({ searchParams }) {
    return (
        <FPage can={["viewOrders"]} title="Accounting">
            <TablePage
                filterKey="sales-accounting"
                searchParams={searchParams}
                PageClient={SalesAccountingTable}
            />
        </FPage>
    );
}
