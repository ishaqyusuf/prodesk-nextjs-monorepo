import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Context, useCreateContext, useCtx } from "./ctx";
import Money from "@/components/_v1/money";
import ConfirmBtn from "@/components/_v1/confirm-btn";
import { cn } from "@/lib/utils";
import TextWithTooltip from "@/components/(clean-code)/custom/text-with-tooltip";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/_v1/icons";
import { Input } from "@/components/ui/input";
import { LineInput, LineSwitch } from "../line-input";

interface Props {
    itemStepUid;
}
export default function ServiceLineItem({ itemStepUid }: Props) {
    const ctx = useCreateContext(itemStepUid);

    return (
        <>
            <Context.Provider value={ctx}>
                <Table className="p-4 text-xs table-fixed font-medium">
                    <TableHeader>
                        <TableRow className="uppercase">
                            <TableHead className="w-10">Sn.</TableHead>
                            <TableHead className="w-full">
                                Description
                            </TableHead>
                            <TableHead className="w-16">Tax</TableHead>
                            <TableHead className="w-16">
                                <TextWithTooltip
                                    text={"Production"}
                                    className="w-16"
                                ></TextWithTooltip>
                            </TableHead>
                            <TableHead className="w-28">Qty</TableHead>
                            <TableHead className="w-28">Unit Price</TableHead>

                            <TableHead className="w-28">Line Total</TableHead>
                            <TableHead className="w-16"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ctx.itemIds?.map((m, index) => (
                            <ServiceRow sn={index + 1} lineUid={m} key={m} />
                        ))}
                    </TableBody>
                    <TableFooter className="bg-accent">
                        <TableRow>
                            <TableCell>
                                <Button
                                    onClick={() => {
                                        ctx.ctx.addServiceLine();
                                    }}
                                >
                                    <Icons.add className="size-4 mr-2" />
                                    <span>Line</span>
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Context.Provider>
        </>
    );
}
function ServiceRow({ lineUid, sn }: { sn; lineUid }) {
    const ctx = useCtx();
    const mfd = ctx.itemForm?.groupItem?.form?.[lineUid];
    const valueChanged = () => {
        ctx.ctx.updateGroupedCost();
        ctx.ctx.calculateTotalPrice();
    };
    return (
        <>
            <TableRow className={cn(!mfd?.selected && "hidden")}>
                <TableCell className="font-mono">{sn}.</TableCell>
                <TableCell className="font-mono font-medium text-sm">
                    <LineInput
                        cls={ctx.ctx}
                        name="meta.description"
                        lineUid={lineUid}
                    />
                </TableCell>
                <TableCell>
                    <LineSwitch
                        cls={ctx.ctx}
                        name="meta.taxxable"
                        lineUid={lineUid}
                        valueChanged={valueChanged}
                    />
                </TableCell>
                <TableCell>
                    <LineSwitch
                        cls={ctx.ctx}
                        name="meta.produceable"
                        lineUid={lineUid}
                    />
                </TableCell>
                <TableCell>
                    <LineInput
                        cls={ctx.ctx}
                        name="qty.total"
                        lineUid={lineUid}
                        type="number"
                        valueChanged={valueChanged}
                    />
                </TableCell>
                <TableCell>
                    <LineInput
                        cls={ctx.ctx}
                        name="pricing.customPrice"
                        lineUid={lineUid}
                        type="number"
                        valueChanged={valueChanged}
                    />
                    {/* <Input
                        type="number"
                        defaultValue={mfd?.addon}
                        onChange={(e) => {
                            ctx.ctx.dotUpdateGroupItemFormPath(
                                lineUid,
                                "pricing.addon",
                                +e.target.value
                            );
                            valueChanged();
                        }}
                    /> */}
                </TableCell>
                <TableCell>
                    <Money value={mfd?.pricing?.totalPrice} />
                </TableCell>
                <TableCell align="right">
                    <ConfirmBtn
                        onClick={() => {
                            ctx.ctx.removeGroupItem(lineUid);
                        }}
                        trash
                        disabled={ctx.ctx.selectCount == 1}
                        size="icon"
                    />
                </TableCell>
            </TableRow>
        </>
    );
}
