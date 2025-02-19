import {} from "@prisma/client";
import { OmitMeta } from "./type";
import { ISalesOrder, ISalesOrderItem } from "./sales";

export interface InboundOrder extends OmitMeta<any> {
    meta: {};
    _count: {};
}
export interface IInboundOrder extends OmitMeta<any> {
    meta: {};
    inboundItems: IInboundOrderItems[];
    _count: {};
}
export interface IInboundOrderItems extends OmitMeta<any> {
    meta: {};
    salesOrderItems: ISalesOrderItem;
    InboundOrder: InboundOrder;
}
