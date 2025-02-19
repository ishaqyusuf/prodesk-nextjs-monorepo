import { salesOverviewStore } from "../../store";
import Button from "@/components/common/button";
import { Icons } from "@/components/_v1/icons";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Money from "@/components/_v1/money";
import { Label } from "@/components/ui/label";
import { composeSalesUrl } from "../../../../utils/sales-utils";
import { openCustomerOverviewSheet } from "../../../customer-overview-sheet";
import Note from "@/modules/notes";
import { noteTagFilter } from "@/modules/notes/utils";
import { LaborCostInline } from "@/components/sales-overview/labor-cost-inline";
import { PoInline } from "@/components/sales-overview/po-inline";
import { SalesDateInline } from "@/components/sales-overview/sales-date-inline";
import { SalesDeliveryCostInline } from "@/components/sales-overview/sales-delivery-cost-inline";
import { SalesInvoiceDueStatus } from "@/components/sales-invoice-due-status";

export function SalesInfoTab({}) {
    const store = salesOverviewStore();
    const overview = store.overview;
    if (!overview) return;
    return (
        <div>
            <InfoLine label="Order #" value={overview.orderId}>
                <Link
                    className={cn(
                        buttonVariants({
                            size: "xs",
                            variant: "link",
                        })
                    )}
                    href={composeSalesUrl(overview)}
                    target="_blank"
                >
                    Edit
                    <ExternalLink className="size-4 ml-2" />
                </Link>
            </InfoLine>
            <InfoLine
                label="Customer"
                value={
                    <Button
                        size="xs"
                        disabled={!overview?.phoneNo}
                        onClick={() => {
                            openCustomerOverviewSheet(overview.phoneNo);
                        }}
                        variant={overview?.phoneNo ? "destructive" : "outline"}
                    >
                        {overview?.displayName || overview?.phoneNo}
                    </Button>
                }
            ></InfoLine>
            <SalesDateInline />
            <InfoLine
                label="Sales Rep"
                value={overview.salesRep?.name}
            ></InfoLine>

            <PoInline />
            <LaborCostInline />
            <SalesDeliveryCostInline />
            <InfoLine
                label="Total Invoice"
                value={<Money value={overview?.invoice?.total} />}
            ></InfoLine>
            <InfoLine
                label="Paid"
                value={<Money value={overview?.invoice?.paid} />}
            ></InfoLine>
            <InfoLine
                label="Pending"
                value={
                    <span>
                        <SalesInvoiceDueStatus
                            amountDue={overview?.invoice?.pending}
                            dueDate={overview?.paymentDueDate}
                        />
                    </span>
                }
            ></InfoLine>

            <div className="grid my-4 sm:grid-cols-2 gap-4">
                {[overview.billing, overview.shipping].map((k, i) => (
                    <div key={i}>
                        <Label>
                            {i == 0 ? "Billing" : "Shipping"}
                            {" Address"}
                        </Label>
                        {!k?.length ? (
                            <div className="min-h-16 flex flex-col items-center justify-center">
                                No Address
                            </div>
                        ) : (
                            k.map((line, ki) => {
                                const Ico = Icons[line.icon];
                                return (
                                    <div
                                        key={ki}
                                        className="flex gap-4 py-1 border-b"
                                    >
                                        {Ico && (
                                            <Ico className="size-4 text-muted-foreground" />
                                        )}
                                        <span>{line.value}</span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                ))}
            </div>
            <Note
                admin
                tagFilters={[
                    // noteTagFilter("itemControlUID", itemView?.itemControlUid),
                    // noteTagFilter("salesItemId", itemView?.itemId),
                    noteTagFilter("salesId", store?.salesId),
                ]}
                typeFilters={["general", "dispatch", "payment", "production"]}
                statusFilters={["public", "private"]}
                subject={`Sales Note`}
                headline={`${overview?.orderId}`}
            />
        </div>
    );
}
export function InfoLine({
    label,
    value,
    children,
}: {
    label?: string;
    value?;
    children?;
}) {
    return (
        <div className="flex gap-4 p-1 py-2 b border-b items-center">
            <span className="text-sm uppercase font-semibold text-muted-foreground">
                {label}:
            </span>
            <div className="flex-1"></div>
            <span className="text-sm uppercase font-mono">{value}</span>
            {children}
        </div>
    );
}
