import { InputHTMLAttributes, memo, useEffect, useMemo } from "react";
import { Context, HptContext, useCreateContext, useCtx } from "./ctx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextWithTooltip from "@/components/(clean-code)/custom/text-with-tooltip";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import ConfirmBtn from "@/components/_v1/confirm-btn";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/_v1/icons";
import { Menu } from "@/components/(clean-code)/menu";
import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import Money from "@/components/_v1/money";

import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/controls/form-input";
import { DataLine } from "@/components/(clean-code)/data-table/Dl";
import { Label } from "@/components/ui/label";
import { MoneyBadge } from "@/components/(clean-code)/money-badge";
import { LineInput } from "../line-input";
import { Repeat } from "lucide-react";
import { Door } from "./door";

interface Props {
    itemStepUid;
}
export default function HousePackageTool({ itemStepUid }: Props) {
    const ctx = useCreateContext(itemStepUid);

    return (
        <div className="">
            <Context.Provider value={ctx}>
                <Tabs
                    onValueChange={(e) => {
                        ctx.ctx.tabChanged(e);
                        // ctx.setTab(e);
                    }}
                    value={ctx.ctx.tabUid}
                >
                    <TabsList className="bg-transparent">
                        {ctx.doors?.map((door) => (
                            <TabsTrigger
                                asChild
                                key={door.uid}
                                value={door.uid}
                                className="p-0 bg-white"
                            >
                                <div className="">
                                    <Button
                                        size="xs"
                                        className={cn(
                                            "border-b-2 border-b-transparent",
                                            ctx.ctx.tabUid == door.uid &&
                                                "border-muted-foreground rounded-b-none"
                                        )}
                                        variant={
                                            ctx.ctx.tabUid == door.uid
                                                ? "secondary"
                                                : "ghost"
                                        }
                                    >
                                        <TextWithTooltip
                                            className="max-w-[260px]"
                                            text={door.title}
                                        />
                                    </Button>
                                    <div
                                        className={cn(
                                            // ctx.ctx.tabUid != door.uid &&
                                            "hidden"
                                        )}
                                    >
                                        <Menu>
                                            <Menu.Item Icon={Repeat}>
                                                Swap Door
                                            </Menu.Item>
                                        </Menu>
                                    </div>
                                </div>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {ctx.doors?.map((door) => (
                        <TabsContent key={door.uid} value={door.uid}>
                            <DoorSizeTable door={door} />
                        </TabsContent>
                    ))}
                </Tabs>
            </Context.Provider>
        </div>
    );
}
interface DoorSizeTable {
    door: HptContext["doors"][number];
}
function DoorSizeTable({ door }: DoorSizeTable) {
    const ctx = useCtx();

    return (
        <div className="grid w-full grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
                <Table className="p-4   font-medium table-fixed">
                    <TableHeader className="text-xs">
                        <TableRow className="uppercase">
                            <TableHead className="w-full">Size</TableHead>
                            {ctx.config.hasSwing && (
                                <TableHead className="w-28">Swing</TableHead>
                            )}
                            {ctx.config.noHandle ? (
                                <TableHead className="w-28">Qty</TableHead>
                            ) : (
                                <>
                                    <TableHead className="w-28">Lh</TableHead>
                                    <TableHead className="w-28">Rh</TableHead>
                                </>
                            )}
                            <TableHead className="w-28">Estimate</TableHead>
                            {/* <TableHead className="w-28">Addon/Qty</TableHead> */}
                            <TableHead className="w-28">Line Total</TableHead>
                            <TableHead className="w-16"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {door.sizeList.map((sl, i) => (
                            <DoorSizeRow size={sl} key={i} />
                        ))}
                    </TableBody>

                    <TableFooter className="bg-accent">
                        <TableRow>
                            <TableCell>
                                <Menu
                                    Trigger={
                                        <Button>
                                            <Icons.add className="size-4 mr-2" />
                                            <span>Size</span>
                                        </Button>
                                    }
                                >
                                    {door.sizeList.map((sl) => (
                                        <Menu.Item
                                            onClick={() => {
                                                ctx.ctx.addHeight(sl);
                                            }}
                                            key={sl.path}
                                            disabled={sl.selected}
                                        >
                                            {sl.title}

                                            <DropdownMenuShortcut>
                                                <Badge
                                                    variant={
                                                        sl.salesPrice
                                                            ? "destructive"
                                                            : "secondary"
                                                    }
                                                >
                                                    {sl.salesPrice ? (
                                                        <Money
                                                            value={
                                                                sl.salesPrice
                                                            }
                                                        />
                                                    ) : (
                                                        "$"
                                                    )}
                                                </Badge>
                                            </DropdownMenuShortcut>
                                        </Menu.Item>
                                    ))}
                                </Menu>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
            <div className="hidden lg:block">
                <Door door={door} />
            </div>
        </div>
    );
}
function DoorSizeRow({ size }: { size }) {
    const lineUid = size.path;
    const ctx = useCtx();
    const sizeForm = ctx.itemForm?.groupItem.form[size.path];

    const valueChanged = () => {
        ctx.ctx.updateGroupedCost();
        ctx.ctx.calculateTotalPrice();
    };
    return (
        <TableRow className={cn(!sizeForm?.selected && "hidden")}>
            <TableCell className="font-mono font-semibold text-sm">
                {size.title}
            </TableCell>
            {ctx.config.hasSwing && (
                <TableCell>
                    <LineInput cls={ctx.ctx} name="swing" lineUid={lineUid} />
                </TableCell>
            )}
            {ctx.config.noHandle ? (
                <TableCell>
                    <LineInput
                        cls={ctx.ctx}
                        name="qty.total"
                        lineUid={lineUid}
                        type="number"
                        valueChanged={valueChanged}
                    />
                </TableCell>
            ) : (
                <>
                    <TableCell className="">
                        <LineInput
                            cls={ctx.ctx}
                            name="qty.lh"
                            lineUid={lineUid}
                            type="number"
                            valueChanged={valueChanged}
                        />
                    </TableCell>
                    <TableCell className="">
                        <LineInput
                            cls={ctx.ctx}
                            name="qty.rh"
                            lineUid={lineUid}
                            type="number"
                            valueChanged={valueChanged}
                        />
                    </TableCell>
                </>
            )}
            <TableCell className="">
                <Menu
                    noSize
                    Icon={null}
                    label={<Money value={sizeForm?.pricing?.unitPrice} />}
                >
                    <div className="p-2 min-w-[300px]">
                        <div>
                            <Label>Price Summary</Label>
                        </div>
                        <dl>
                            {ctx.pricedSteps?.map((step) => (
                                <DataLine
                                    size="sm"
                                    key={step.title}
                                    label={step.title}
                                    value={
                                        <div className="flex gap-4 items-center justify-end">
                                            <span>{step.value}</span>
                                            <MoneyBadge>
                                                {step.price}
                                            </MoneyBadge>
                                        </div>
                                    }
                                />
                            ))}
                            <DataLine
                                size="sm"
                                label="Door"
                                value={
                                    <div className="flex gap-4 items-center justify-end">
                                        <span>{`${size.title}`}</span>
                                        <MoneyBadge>
                                            {
                                                sizeForm?.pricing?.itemPrice
                                                    ?.salesPrice
                                            }
                                        </MoneyBadge>
                                    </div>
                                }
                            />
                            <DataLine
                                size="sm"
                                label="Addon Price"
                                value={
                                    <LineInput
                                        className="w-28"
                                        cls={ctx.ctx}
                                        name="pricing.addon"
                                        lineUid={lineUid}
                                        type="number"
                                        valueChanged={valueChanged}
                                    />
                                }
                            />
                            <DataLine
                                size="sm"
                                label="Custom Price"
                                value={
                                    <LineInput
                                        className="w-28"
                                        cls={ctx.ctx}
                                        name="pricing.customPrice"
                                        lineUid={lineUid}
                                        type="number"
                                        valueChanged={valueChanged}
                                    />
                                }
                            />
                        </dl>
                    </div>
                </Menu>
            </TableCell>
            {/* <TableCell>
                <LineInput
                    cls={ctx.ctx}
                    name="pricing.addon"
                    lineUid={lineUid}
                    type="number"
                    valueChanged={valueChanged}
                />
            </TableCell> */}
            <TableCell>
                <Money value={sizeForm?.pricing?.totalPrice} />
            </TableCell>
            <TableCell align="right">
                <ConfirmBtn
                    disabled={ctx.ctx.selectCount == 1}
                    onClick={() => {
                        ctx.ctx.removeGroupItem(size.path);
                    }}
                    trash
                    size="icon"
                />
            </TableCell>
        </TableRow>
    );
}
