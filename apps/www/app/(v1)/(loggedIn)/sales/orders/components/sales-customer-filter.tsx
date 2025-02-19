"use client";

import { DynamicFilter } from "@/components/_v1/data-table/data-table-dynamic-filter";
import { getStaticCustomers } from "../../(customers)/_actions/sales-customers";

export function SalesCustomerFilter({ table }) {
    return (
        <DynamicFilter
            table={table}
            single
            listKey="staticSalesCustomers"
            labelKey="name"
            valueKey="id"
            title="Customer"
            columnId="_customerId"
            loader={getStaticCustomers}
        />
    );
}
