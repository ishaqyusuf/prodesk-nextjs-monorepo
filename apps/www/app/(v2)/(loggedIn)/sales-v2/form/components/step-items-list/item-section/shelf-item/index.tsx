import { useContext, useEffect } from "react";
import {
    DykeItemFormContext,
    useDykeForm,
} from "../../../../_hooks/form-context";
import { useFieldArray } from "react-hook-form";
import ShelfItemsBlock from "./shelf-items-block";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { generateRandomString } from "@/lib/utils";

export default function ShelfItemIndex() {
    const item = useContext(DykeItemFormContext);
    const form = useDykeForm();
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `itemArray.${item.rowIndex}.item.shelfItemArray`,
    });

    // useEffect(() => {
    //     if (!fields.length)
    //         append({
    //             item: {
    //                 productArray: [
    //                     {
    //                         item: {},
    //                     },
    //                 ],
    //                 categoryIds: [-1],
    //                 categoryId: null,
    //             },
    //         });
    // }, [fields]);
    return (
        <Table>
            <TableHeader className="">
                <TableRow>
                    <TableHead className="w-10">Item</TableHead>
                    <TableHead className="w-1/4">Category</TableHead>
                    <TableHead className="flex  w-full  space-x-4 items-center">
                        <div className="flex-1">Product</div>
                        <div className="w-20">Qty</div>
                        <div className="w-24 text-right">Rate</div>
                        <div className="w-24 text-right">Line Total</div>
                        <div className="w-12"></div>
                    </TableHead>
                    {/* <TableHead>Product</TableHead> */}
                    {/* <TableHead>Qty</TableHead> */}
                    {/* <TableHead>Rate</TableHead> */}
                    {/* <TableHead>Line Total</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
                {fields.map((field, index) => (
                    <ShelfItemsBlock
                        deleteItem={() => {
                            remove(index);
                        }}
                        key={field.id}
                        shelfIndex={index}
                    />
                ))}
                <TableRow>
                    <TableCell colSpan={2}>
                        <div className="">
                            <Button
                                onClick={() => {
                                    append({
                                        categoryIds: [null as any],
                                        productArray: [
                                            {
                                                item: {} as any,
                                            },
                                        ],
                                        uid: generateRandomString(4),
                                        categoryId: null as any,
                                    });
                                }}
                                variant="outline"
                            >
                                <span>Add Shelf Item</span>
                            </Button>
                        </div>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}
