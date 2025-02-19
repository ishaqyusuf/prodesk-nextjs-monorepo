import { useForm } from "react-hook-form";
import { txStore } from "./store";
import { getCustomersSelectListUseCase } from "../../use-case/customer-use-case";
import { useEffect, useState } from "react";
import AutoComplete from "@/components/_v1/common/auto-complete";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { useDebounceInput } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { listFilter } from "@/lib/utils";

export default function CustomerSelector({}) {
    const tx = txStore();
    const updateFilter = (value) => {
        setCustomersList(
            // listFilter(tx.customers || [], value, null)?.
            tx.customers //?.filter((a, i) => i < 15)
        );
    };
    const deb = useDebounceInput("", 500, updateFilter);
    const form = useForm({
        defaultValues: {
            phoneNo: tx.phoneNo || "",
        },
    });

    useEffect(() => {
        if (!tx.customers?.length)
            getCustomersSelectListUseCase().then((result) => {
                tx.dotUpdate("customers", result);
                updateFilter("");
            });
        else updateFilter("");
    }, []);
    const [customers, setCustomersList] = useState([]);

    return (
        <div className="border-b">
            <Form {...form}>
                {/* <Input
                    value={deb.value}
                    onChange={(e) => deb.setValue(e.target.value)}
                    placeholder="Search Customer"
                /> */}
                {/* <ScrollArea className="flex-1 h-[75vh]">
                    <Table>
                        <TableBody>
                            {customers?.map((customer, i) => (
                                <TableRow key={i}>
                                    <TableCell>{customer.label}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea> */}
                <AutoComplete
                    onSelect={(value: any) => {
                        const phone = value.data?.value;
                        if (phone) tx.dotUpdate("phoneNo", phone);
                        else toast.error("Customer must have phone no");
                    }}
                    itemText={"label"}
                    itemValue={"value"}
                    options={tx.customers}
                    size="sm"
                    form={form}
                    formKey={"phoneNo"}
                    label={"Select Customer"}
                    perPage={10}
                />
            </Form>
        </div>
    );
}
