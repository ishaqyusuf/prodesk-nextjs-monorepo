"use client";

import PageHeader from "@/components/_v1/page-header";
import InboundFormTableShell from "@/components/_v1/shells/inbound-form-table-shell";
import { IInboundOrder } from "@/types/sales-inbound";

interface Props {
    list: any;
    form: IInboundOrder;
    suppliers: string[];
}
export default function InboundForm({ form, list, suppliers }: Props) {
    async function create() {}
    return (
        <>
            <PageHeader title="New Inbound" />
            <InboundFormTableShell {...list} suppliers={suppliers} />
        </>
    );
}
