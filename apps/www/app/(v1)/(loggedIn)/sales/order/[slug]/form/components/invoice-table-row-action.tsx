import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { deepCopy } from "@/lib/deep-copy";
import {
    copySalesItem,
    insertLine,
    openComponentModal,
} from "@/lib/sales/sales-invoice-form";
import { store, useAppSelector } from "@/store";
import { openItemComponent } from "@/store/invoice-item-component-slice";
import { ISalesOrderForm, ISalesOrderItem } from "@/types/sales";

import {
    ArrowDown,
    ArrowUp,
    Copy,
    Delete,
    Layers,
    MoreHorizontal,
    Move,
    Plus,
    Trash,
} from "lucide-react";
import { useFieldArray } from "react-hook-form";
import salesUtils from "../sales-utils";

export default function InvoiceTableRowAction({
    form,
    rowIndex,
    startTransition,
}: {
    rowIndex: number;
    form: ISalesOrderForm;
    startTransition;
}) {
    const orderItemComponentSlice = useAppSelector(
        (state) => state.orderItemComponent
    );
    const baseKey: any = `items.${rowIndex}`;
    const watchItems = form.watch("items");
    const { control } = form;
    const { replace, fields, remove, insert } = useFieldArray({
        control,
        name: "items",
    });
    function _addLine(toIndex) {
        // startTransition(() => {
        insert(toIndex, salesUtils.generateInvoiceItem(-1));
        // replace(salesUtils.newInvoiceLine(toIndex, watchItems as any));
        // });
        // insert(toIndex, generateItem(toIndex));
    }
    function _removeLine() {
        startTransition(() => {
            remove(rowIndex);
        });
    }
    function clearLine() {
        startTransition(() => {});
    }
    function copyLine() {
        startTransition(() => {
            let _fields = watchItems || [];
            let copy: ISalesOrderItem = copySalesItem(
                _fields?.[rowIndex]
            ) as any;

            if (copy) {
                replace(insertLine(_fields, rowIndex, copy));
            }
        });
    }
    // const modal =
    return (
        <TableCell className="p-0 px-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                    <DropdownMenuItem
                        onClick={() => {
                            openComponentModal(
                                deepCopy(form.getValues(baseKey)),
                                rowIndex
                            );
                        }}
                    >
                        <Layers className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Component
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={clearLine}>
                        <Delete className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Clear
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={copyLine}>
                        <Copy className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Copy
                    </DropdownMenuItem>

                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                            <Plus className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                            Add Line
                        </DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem
                                onClick={() => _addLine(rowIndex)}
                            >
                                <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                Before
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => _addLine(rowIndex + 1)}
                            >
                                <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                After
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub>
                    {/* <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Move className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Move To
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>1</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={_removeLine}>
                        <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Remove
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    );
}
