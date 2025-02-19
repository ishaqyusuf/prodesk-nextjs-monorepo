import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Money from "@/components/_v1/money";
import { DataLine } from "@/components/(clean-code)/data-table/Dl";
import { cn } from "@/lib/utils";
import { GetSalesOverview } from "../../../use-case/sales-item-use-case";
import { useSalesOverview } from "../overview-provider";
import { Menu } from "@/components/(clean-code)/menu";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormCheckbox from "@/components/common/controls/form-checkbox";
import Button from "@/components/common/button";
import { updateSalesItemControlUseCase } from "../../../use-case/sales-item-control-use-case";
import { toast } from "sonner";

export type ItemGroupType = GetSalesOverview["itemGroup"][number];
export type ItemType = ItemGroupType["items"][number];
export type ItemAssignment = ItemType["assignments"][number];
export type ItemAssignmentSubmission = ItemAssignment["submissions"][number];
type PillsType = ItemType["pills"];
type AnalyticsType = ItemType["analytics"];
export function SalesItemsOverview({}) {
    const ctx = useSalesOverview();
    const [showDetails, setShowDetails] = useState({});
    function toggleDetail(id) {
        setShowDetails((val) => {
            return {
                ...val,
                [id]: !val[id],
            };
        });
    }
    useEffect(() => {
        ctx.load();
    }, []);
    return (
        <div>
            {/* <Button onClick={() => ctx.load()}>Refresh</Button> */}
            {ctx.overview?.itemGroup?.map((grp, id) => (
                <div
                    className="text-sm sborder my-1.5 srounded-lg sshadow-sm group mx-4 sm:mx-8"
                    key={id}
                >
                    <Details show={showDetails[id]} group={grp} />
                    {grp.items.map((item, itemId) => (
                        <LineItem
                            key={itemId}
                            className={cn(
                                "",
                                ctx.tabData?.slug == "itemView" &&
                                    ctx.tabData?.meta?.groupIndex == id &&
                                    ctx.tabData?.payloadSlug == itemId
                                    ? "bg-muted-foreground/10"
                                    : item.analytics.control.produceable
                                    ? "hover:bg-muted-foreground/10 cursor-pointer"
                                    : null
                            )}
                            onClick={() => {
                                if (item.analytics.control.produceable)
                                    ctx.openItemTab(id, itemId);
                            }}
                            item={item}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
interface LineItemProps {
    className?: string;
    item: ItemType;
    onClick?;
}
export function LineItem({ className = null, item, onClick }: LineItemProps) {
    const ctx = useSalesOverview();
    const menuRef = useRef(null);
    const controlForm = useForm({
        defaultValues: {
            ...item.analytics.control,
        },
    });
    return (
        <div className={cn("bg-white sm:rounded-lg my-3 border", className)}>
            <div onClick={onClick} className="py-2 px-4">
                <div className="flex items-center">
                    <div className="flex-1 uppercase">{item.title}</div>
                    <div className="text-sm font-medium">
                        <Money value={item.total} />
                    </div>
                </div>
                <div className="flex justify-between">
                    <Pills item={item} />
                    <div className="flex-1"></div>
                </div>
            </div>
            {item.analytics?.info && (
                <div className="mt-1 flex justify-between border-t text-xs uppercase font-semibold text-muted-foreground">
                    {/* <div className="flex1"></div> */}
                    <div onClick={onClick} className="flex-1 flex justify-end">
                        {item.analytics?.info?.map((info, k) => (
                            <div className="w-1/3  p-2 font-mono px-4" key={k}>
                                {info.text}
                            </div>
                        ))}
                    </div>
                    <div className="p-1">
                        <Menu ref={menuRef} triggerSize="sm">
                            <Menu.Item
                                SubMenu={
                                    <Card className="min-w-[240px] border-0">
                                        <CardHeader>
                                            <CardTitle>Item Control</CardTitle>
                                            <CardDescription>
                                                Configure item behaviour
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="grid gap-4">
                                            <Form {...controlForm}>
                                                <FormCheckbox
                                                    label="Production"
                                                    control={
                                                        controlForm.control
                                                    }
                                                    name="produceable"
                                                />
                                                <FormCheckbox
                                                    control={
                                                        controlForm.control
                                                    }
                                                    name="shippable"
                                                    label="Shipping"
                                                />
                                            </Form>
                                        </CardContent>
                                        <CardFooter className="justify-end">
                                            <Button
                                                onClick={async () => {
                                                    await updateSalesItemControlUseCase(
                                                        controlForm.getValues()
                                                    );
                                                    ctx.refresh();
                                                    toast.success(
                                                        "Item Control Updated"
                                                    );
                                                    menuRef?.current?._onOpenChanged(
                                                        false
                                                    );
                                                }}
                                            >
                                                Submit
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                }
                            >
                                Configure
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
            )}
        </div>
    );
}
export function Details({ group, show }: { show; group: ItemGroupType }) {
    if (!show) return null;
    return (
        <div className="grid ssm:grid-cols-2 sm:gap-2 sm:-mx-8">
            {group.style.map((style, id) => (
                <DataLine key={id} {...style} />
            ))}
        </div>
    );
}
function SectionTitle({ title, children }) {
    if (!title && !children) return null;
    return (
        <div className="p-2  -mx-4 sm:-ml-8 flex justify-between items-center">
            <Label className="uppercase">{title}</Label>
            <div className="inline-flex space-x-2">{children}</div>
        </div>
    );
}
function Pills({ item }: { item: ItemType }) {
    if (!item.pills.filter((p) => p.value).length) return null;
    return (
        <div className="flex space-x-4 my-1">
            {item.pills
                ?.filter((p) => p.value)
                .map((pill, id) => (
                    <div key={id}>
                        <Badge
                            className="text-xs font-mono uppercase"
                            variant="secondary"
                        >
                            {pill.text}
                        </Badge>
                    </div>
                ))}
        </div>
    );
}
