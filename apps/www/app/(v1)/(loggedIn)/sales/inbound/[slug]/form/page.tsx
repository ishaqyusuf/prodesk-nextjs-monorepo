import { queryParams } from "@/app/(v1)/_actions/action-utils";
import { getInboundForm } from "@/app/(v1)/_actions/sales-inbound/get-form";
import { Breadcrumbs } from "@/components/_v1/breadcrumbs";
import { BreadLink } from "@/components/_v1/breadcrumbs/links";
import InboundForm from "@/components/_v1/forms/sales-inbound-order-form/inbound-form";
import PageHeader from "@/components/_v1/page-header";
import { DataPageShell } from "@/components/_v1/shells/data-page-shell";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "New Inbound",
};

export default async function InboundFormPage({
    params: { slug },
    searchParams,
}) {
    const response = await getInboundForm(slug, queryParams(searchParams));
    // return <>a</>;
    return (
        <div className="space-y-4 px-8">
            <DataPageShell data={response}>
                <Breadcrumbs>
                    <BreadLink title="Sales" isFirst />
                    <BreadLink title="Inbounds" link="/sales/inbounds" />
                    <BreadLink title={"New"} isLast />
                </Breadcrumbs>
                <InboundForm {...response} />
            </DataPageShell>
        </div>
    );
}
