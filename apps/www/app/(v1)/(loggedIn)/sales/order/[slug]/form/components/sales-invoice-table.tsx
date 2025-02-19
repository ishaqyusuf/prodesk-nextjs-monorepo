import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useFieldArray } from "react-hook-form";
import * as React from "react";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLoader } from "@/lib/use-loader";
import { ISalesOrderForm } from "@/types/sales";
import { SalesInvoiceTr } from "./sales-invoice-tr";
import InvoiceTableFooter from "./invoice-table-footer";
import { SalesFormResponse } from "@/app/(v1)/(loggedIn)/sales/_actions/sales-form";
import { useMediaQuery } from "react-responsive";
import { screens } from "@/lib/responsive";
import { cn } from "@/lib/utils";
import salesUtils from "../sales-utils";
import usePersistDirtyForm from "@/_v2/hooks/use-persist-dirty-form";
import SalesComponentModal from "@/lib/sales/sales-component-modal";
export default function SalesInvoiceTable({
    form,
    data,
}: {
    form: ISalesOrderForm;
    data: SalesFormResponse;
}) {
    const { watch, control, register } = form;
    const watchItems = watch("items");
    const watchProfileEstimate = watch("meta.profileEstimate");
    const profileChange = watch("meta.sales_percentage");
    const { fields, replace } = useFieldArray({
        control,
        name: "items",
    });
    React.useEffect(() => {
        startTransition(() => {});
    }, [watchProfileEstimate, profileChange]);
    const tableRef = React.useRef(null);
    const [floatingFooter, setFloatingFooter] = React.useState(false);

    usePersistDirtyForm();
    const hideFooter = useLoader();
    React.useEffect(() => {
        const handleIntersection = (entries) => {
            const [entry] = entries;
            setFloatingFooter(entry.isIntersecting == false);
        };
        const observer = new IntersectionObserver(handleIntersection, {
            // rootMargin: "0px 0px 0px 0px",
        });

        if (tableRef.current) {
            observer.observe(tableRef.current);
        }

        return () => {
            if (tableRef.current) {
                observer.unobserve(tableRef.current);
            }
        };
    }, [hideFooter.isLoading]);
    const [isPending, startTransition] = React.useTransition();

    const isMobile = useMediaQuery(screens.xs);
    return (
        <div className={cn("relative", isMobile && "max-md:overflow-x-auto")}>
            <div className={cn(isMobile && "max-md:w-[900px]")}>
                <Table className="">
                    <TableHeader>
                        <TableRow>
                            {/* <TableHead className="w-[100px]">Invoice</TableHead> */}
                            <TableHead className="w-[25px]  px-1">#</TableHead>
                            <TableHead className="w-5 px-1">
                                <Layers className="h-3.5 w-3.5" />
                            </TableHead>
                            <TableHead className="px-1">Item</TableHead>
                            <TableHead className="w-20  px-1">Swing</TableHead>
                            <TableHead className="w-20 px-1">
                                Supplier
                            </TableHead>
                            <TableHead className="w-14 px-1 text-center">
                                Qty
                            </TableHead>
                            <TableHead className="w-20 px-1">Cost</TableHead>
                            {watchProfileEstimate ? (
                                <>
                                    <TableHead className="w-8 px-1">
                                        Rate
                                    </TableHead>
                                </>
                            ) : (
                                <></>
                            )}
                            <TableHead className="w-8 px-1 text-right">
                                Total
                            </TableHead>
                            <TableHead className="w-8 px-1 text-center">
                                Tax
                            </TableHead>
                            <TableHead className="w-10 px-1"></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {fields.map((field, i) => (
                            <SalesInvoiceTr
                                ctx={data.ctx}
                                rowIndex={i}
                                startTransition2={startTransition}
                                isPending={isPending}
                                field={field}
                                form={form}
                                key={field.id}
                            />
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex">
                <Button
                    className="w-full"
                    onClick={() => {
                        hideFooter.action(() => {
                            replace(
                                salesUtils.moreInvoiceLines(watchItems as any)
                            );
                        });
                    }}
                    variant="ghost"
                >
                    More Lines
                </Button>
            </div>
            {floatingFooter && <div className="h-[250px]"></div>}
            <div id="lastLine" ref={tableRef} className=""></div>
            <InvoiceTableFooter
                ctx={data.ctx}
                floatingFooter={floatingFooter}
                form={form}
            />
            <SalesComponentModal
                startTransition2={startTransition}
                form={form}
                ctx={data.ctx}
            />
            <div className="hidden fixed h-[40vh] border shadow p-2 rounded overflow-auto top-0 left-0 bg-white w-1/5 z-[999] m-4">
                {fields.map((field, index) => (
                    <p key={field.id}>
                        {index + 1}
                        {":"}
                        {field.description}
                        {","}
                        {field.swing}
                        {","}
                        {field.supplier}
                        {","}
                        {field.qty}
                        {","}
                        {field.price}
                    </p>
                ))}
            </div>
        </div>
    );
}
