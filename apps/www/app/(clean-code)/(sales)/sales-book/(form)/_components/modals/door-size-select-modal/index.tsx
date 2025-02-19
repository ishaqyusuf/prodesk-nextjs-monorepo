import Modal from "@/components/common/modal";

import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { _modal } from "@/components/common/modal/provider";
import { toast } from "sonner";
import { ComponentHelperClass } from "../../../_utils/helpers/zus/step-component-class";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import FormInput from "@/components/common/controls/form-input";
import {
    saveComponentPricingUseCase,
    updateComponentPricingUseCase,
} from "@/app/(clean-code)/(sales)/_common/use-case/sales-book-pricing-use-case";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { cn, toNumber } from "@/lib/utils";
import Money from "@/components/_v1/money";
import AdminControl from "../../admin-control";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { DoorSizeSelectContext, useCtx, useInitContext } from "./ctx";
import { Door } from "../door-swap-modal";
import FormSelect from "@/components/common/controls/form-select";
import { Menu } from "@/components/(clean-code)/menu";
import { Input } from "@/components/ui/input";

interface Props {
    cls: ComponentHelperClass;
    door?: Door;
}

const pricingOptions = ["Single Pricing", "Multi Pricing"] as const;
type PricingOption = (typeof pricingOptions)[number];

export default function DoorSizeSelectModal({ cls, door }: Props) {
    const ctx = useInitContext(cls, door);
    const config = ctx.routeConfig;
    return (
        <DoorSizeSelectContext.Provider value={ctx}>
            <Modal.Content
                size={config.hasSwing || !config.noHandle ? "lg" : "md"}
            >
                <Modal.Header
                    title={ctx.cls?.getComponent?.title || "Component Price"}
                    subtitle={"Edit door size price"}
                />
                <Form {...ctx.form}>
                    <ScrollArea
                        // tabIndex={-1}
                        className="max-h-[50vh] px-4 -mx-4"
                    >
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Size</TableHead>
                                    <TableHead>Price</TableHead>
                                    {config.hasSwing && (
                                        <TableHead>Swing</TableHead>
                                    )}
                                    {config.noHandle ? (
                                        <TableHead>Qty</TableHead>
                                    ) : (
                                        <>
                                            <TableHead>LH</TableHead>
                                            <TableHead>RH</TableHead>
                                        </>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ctx.sizeList?.map((variant, index) => (
                                    <Row key={index} variant={variant} />
                                ))}
                            </TableBody>
                        </Table>
                    </ScrollArea>
                </Form>
                {door ? (
                    <Modal.Footer
                        className={""}
                        submitText="Swap Door"
                        size="sm"
                        onSubmit={ctx.swapDoor}
                    >
                        <Button
                            onClick={() => {
                                _modal.close();
                            }}
                            variant="destructive"
                            size="sm"
                        >
                            Cancel Swap
                        </Button>
                    </Modal.Footer>
                ) : (
                    <Modal.Footer
                        className={""}
                        submitText="Pick More"
                        size="sm"
                        onSubmit={ctx.pickMore}
                    >
                        <Button
                            onClick={ctx.removeSelection}
                            variant="destructive"
                            size="sm"
                        >
                            Remove Selection
                        </Button>
                        <div className="flex-1"></div>
                        <Button
                            onClick={ctx.nextStep}
                            variant="secondary"
                            size="sm"
                        >
                            Next Step
                        </Button>
                    </Modal.Footer>
                )}
            </Modal.Content>
        </DoorSizeSelectContext.Provider>
    );
}
function Row({ variant }) {
    const ctx = useCtx();
    const config = ctx.routeConfig;
    const [salesPrice, basePrice, selected] = ctx.form.watch([
        `selections.${variant.path}.salesPrice`,
        `selections.${variant.path}.basePrice`,
        `selections.${variant.path}.selected`,
    ]);
    return (
        <TableRow className={cn()}>
            <TableCell className="">
                <Label className="whitespace-nowrap">{variant.size}</Label>
            </TableCell>
            <TableCell>
                <AdminControl fallback={<Money value={salesPrice} />}>
                    <PriceCell
                        salesPrice={salesPrice}
                        basePrice={basePrice}
                        variant={variant}
                    />
                </AdminControl>
            </TableCell>
            {config.hasSwing && (
                <TableCell>
                    <FormSelect
                        size="sm"
                        options={["IN-SWING", "OUT-SWING", "None"]}
                        label={"Swing"}
                        name={`selections.${variant.path}.swing`}
                        control={ctx.form.control}
                    />
                </TableCell>
            )}
            {config.noHandle ? (
                <TableCell className="w-28">
                    <FormInput
                        type="number"
                        control={ctx.form.control}
                        size="sm"
                        name={`selections.${variant.path}.qty.total`}
                    />
                </TableCell>
            ) : (
                <>
                    <TableCell className="w-28">
                        <FormInput
                            type="number"
                            control={ctx.form.control}
                            size="sm"
                            name={`selections.${variant.path}.qty.lh`}
                        />
                    </TableCell>
                    <TableCell className="w-28">
                        <FormInput
                            type="number"
                            control={ctx.form.control}
                            size="sm"
                            name={`selections.${variant.path}.qty.rh`}
                        />
                    </TableCell>
                </>
            )}
        </TableRow>
    );
}
function PriceCell({ salesPrice, basePrice, variant }) {
    const ctx = useCtx();
    // return <Menu Trigger={}></Menu>
    return (
        <Popover>
            <PopoverTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => {
                                    ctx.togglePriceForm(variant.size);
                                }}
                                size="sm"
                                className="h-8"
                                variant={salesPrice ? "default" : "destructive"}
                            >
                                {salesPrice ? (
                                    <Money value={salesPrice} />
                                ) : (
                                    <>Add Price</>
                                )}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Click to edit price</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </PopoverTrigger>
            <PopoverContent
                onClick={(e) => {
                    e.preventDefault();
                }}
            >
                <PriceControl
                    salesPrice={salesPrice}
                    basePrice={basePrice}
                    variant={variant}
                />
            </PopoverContent>
        </Popover>
    );
}
function PriceControl({ salesPrice, basePrice, variant }) {
    const form = useForm({
        defaultValues: {
            price: basePrice || "",
        },
    });
    const ctx = useCtx();
    async function updatePrice() {
        let price = form.getValues("price");
        price = price ? Number(price) : null;
        const data = ctx.priceModel?.formData?.priceVariants?.[variant.size];
        if (data?.id)
            await updateComponentPricingUseCase([
                {
                    id: data.id,
                    price,
                },
            ]);
        else {
            await saveComponentPricingUseCase([
                {
                    id: data.id,
                    price,
                    dependenciesUid: variant.size,
                    dykeStepId: ctx.priceModel?.formData.dykeStepId,
                    stepProductUid: ctx.priceModel?.formData.stepProductUid,
                },
            ]);
        }
        await ctx.cls.fetchUpdatedPrice();
        toast.success("Pricing Updated.");
        ctx.priceChanged(variant.size, price);
    }
    return (
        <Form {...form}>
            <CardHeader>
                <CardTitle>Edit Price</CardTitle>
            </CardHeader>
            <CardContent>
                <FormInput
                    size="sm"
                    control={form.control}
                    name="price"
                    label="Price"
                    prefix="$"
                />
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={updatePrice}>Save</Button>
            </CardFooter>
        </Form>
    );
}
