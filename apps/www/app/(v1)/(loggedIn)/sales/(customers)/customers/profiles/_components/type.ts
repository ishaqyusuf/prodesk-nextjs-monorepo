import { CustomerTypes } from "@prisma/client";

export interface ICustomerProfile extends Omit<CustomerTypes, "meta"> {
    meta: ICustomerProfileMeta;
}
export interface ICustomerProfileMeta {
    net: string;
    goodUntil: number;
    taxCode?: string;
}
