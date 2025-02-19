import { Label } from "@/components/ui/label";
import { useContext } from "react";
import { SalesFormContext } from "../ctx";
import SelectControl from "@/_v2/components/common/select-control";
import transformOptions from "@/_v2/lib/transform-option";
import { ISalesForm } from "../type";
import { FieldPath, FieldValues, useFormContext } from "react-hook-form";
import InputControl from "@/_v2/components/common/input-control";
import salesData from "../../sales-data";
import DateControl from "@/_v2/components/common/date-control";

export default function SalesDetailsSection() {
    const ctx = useContext(SalesFormContext);
    const form = useFormContext<ISalesForm>();

    return (
        <div className="xl:col-span-3 grid gap-2 xl:grid-cols-2 xl:gap-x-4">
            <InfoLine label="Sales Rep:">
                <span>{ctx?.data?.form?.salesRep?.name}</span>
            </InfoLine>
            <InfoLine label="Profile">
                {/* <SelectControl<ISalesForm>
                    name="meta.sales_profile"
                    options={transformOptions(
                        ctx.data.ctx.profiles,
                        "title",
                        "title"
                    )}
                    className="h-8 min-w-[150px]"
                    placeholder="Profile"
                /> */}
            </InfoLine>
            <InfoLine label="Q.B Order #">
                <InputControl<ISalesForm>
                    className="h-8 w-[150px] uppercase"
                    name="meta.qb"
                />
            </InfoLine>
            {/* // Delivery Option */}
            {ctx.isOrder && (
                <InfoLine label="Delivery Option">
                    <SelectControl<ISalesForm>
                        name="deliveryOption"
                        options={salesData.delivery}
                        className="h-8 min-w-[150px]"
                        placeholder="Profile"
                    />
                </InfoLine>
            )}
            <InfoLine label="Mockup %">
                <InputControl<ISalesForm>
                    className="h-8 w-[150px] uppercase"
                    type="number"
                    name="meta.mockupPercentage"
                />
            </InfoLine>
            <InfoLine label="Profile Estimate">
                <InputControl<ISalesForm>
                    switchInput
                    name="meta.profileEstimate"
                />
            </InfoLine>
            <InfoLine label="P.O No">
                <InputControl<ISalesForm>
                    className="h-8 w-[150px] uppercase"
                    name="meta.po"
                />
            </InfoLine>
            {ctx.isOrder && (
                <>
                    <InfoLine label="Payment Term">
                        <SelectControl<ISalesForm>
                            className="min-w-[150px] h-8"
                            name="paymentTerm"
                            options={salesData.paymentTerms}
                        />
                    </InfoLine>
                </>
            )}
            {/* Good Until */}
            {!ctx.isOrder && (
                <InfoLine label="Good Until">
                    <DateControl
                        className="h-8 min-w-[150px]"
                        name="goodUntil"
                    />
                </InfoLine>
            )}
        </div>
    );
}
export function InfoLine({ label, children }: { label?; children? }) {
    return (
        <div className="md:grid md:grid-cols-2 items-center xl:grid-cols-3">
            <Label className="text-muted-foreground whitespace-nowrap">
                {label}
            </Label>
            <div className="text-end flex justify-end text-sm xl:col-span-2">
                {children}
            </div>
        </div>
    );
}
