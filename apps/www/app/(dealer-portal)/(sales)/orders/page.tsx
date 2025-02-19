import FPage from "@/components/(clean-code)/fikr-ui/f-page";
import ClientPage from "../_components/client-page";
import { getDealerSales } from "../_components/action";

export default async function DealersOrderPage({ searchParams }) {
    const resp = getDealerSales(searchParams);
    return (
        <FPage>
            <ClientPage promise={resp} />
        </FPage>
    );
}
