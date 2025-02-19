"use client";
import { useDykeCtx, useDykeForm } from "../_hooks/form-context";
import Btn from "@/components/_v1/btn";
import { _revalidate } from "@/app/(v1)/_actions/_revalidate";
import useDykeFormSaver from "../_hooks/useDykeFormSaver";
import {
    CopyOrderMenuAction,
    MoveSalesMenuItem,
    PrintOrderMenuAction,
    SendEmailMenuAction,
} from "@/components/_v1/actions/sales-menu-actions";
import { Icons } from "@/components/_v1/icons";
import {
    Menu,
    MenuItem,
} from "@/components/_v1/data-table/data-table-row-actions";
import { cn } from "@/lib/utils";
import useScroll from "@/hooks/use-scroll";
import { useModal } from "@/components/common/modal/provider";
import SalesNoteModal from "../../_components/_sales-note/_modal";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/_v1/date-range-picker";
import { ArchiveRestore } from "lucide-react";
import PaymentModal from "../../_components/_payments-modal";
import DykeSettingsModal from "./modals/dyke-settings";
import { SaveMode } from "../../type";
import Evaluator from "./evaluator";
import SaveErrorsModal from "./modals/save-errors-modal";

export default function HeaderSection({}) {
    const form = useDykeForm();
    const [orderId, id, type, slug, date] = form.getValues([
        "order.orderId",
        "order.id",
        "order.type",
        "order.slug",
        "order.createdAt",
    ]);
    const saver = useDykeFormSaver(form);
    const scroll = useScroll((scrollY) => scrollY > 200);
    const modal = useModal();
    const { dealerMode } = useDykeCtx();
    async function save(and: SaveMode = "default") {
        setTimeout(() => {
            form.handleSubmit((data) => saver.save(data, and))();
        }, 100);
    }
    function SaveBtn() {
        return (
            <Menu
                variant={"secondary"}
                disabled={saver.saving}
                label={"Save"}
                Icon={null}
            >
                <MenuItem onClick={() => save()} Icon={Icons.save}>
                    Save
                </MenuItem>
                <MenuItem
                    onClick={() => save("close")}
                    Icon={Icons.saveAndClose}
                >
                    Save & Close
                </MenuItem>
                <MenuItem onClick={() => save("new")} Icon={Icons.add}>
                    Save & New
                </MenuItem>
            </Menu>
        );
    }
    function restoreFailed() {
        modal.openSheet(<SaveErrorsModal />);
    }
    return (
        <div className="h-12">
            <div
                className={cn(
                    "flex h-12 items-center",
                    scroll.isScrolled &&
                        "fixed  top-0  right-0 left-0 grid  lg:grid-cols-[240px_minmax(0,1fr)] z-10 "
                )}
            >
                {scroll.isScrolled && <div></div>}
                <div
                    className={cn(
                        "flex justify-between flex-1  sm:items-center flex-col sm:flex-row",
                        scroll.isScrolled &&
                            "bg-accent py-2   shadow-sm border-b px-8"
                    )}
                >
                    <div className="">
                        <h2 className="text-2xl font-bold tracking-tight">
                            {orderId && id && type == "order"
                                ? "SALES #:"
                                : "QUOTE #:"}{" "}
                            {orderId || "New"}
                        </h2>
                    </div>
                    <div
                        className={cn(
                            dealerMode
                                ? "hidden"
                                : "flex items-center space-x-2"
                        )}
                    >
                        <div className="inline-flex items-center space-x-2">
                            <Label>Date:</Label>
                            <DatePicker
                                disabled={(date) => date > new Date()}
                                setValue={(e) =>
                                    form.setValue("order.createdAt", e)
                                }
                                className="w-auto h-8"
                                value={date}
                            />
                        </div>
                        {id && type == "order" && (
                            <Btn
                                size="sm"
                                // variant={""}
                                onClick={() => {
                                    modal.openSheet(
                                        <PaymentModal
                                            id={id}
                                            orderId={orderId}
                                            form={form}
                                        />
                                    );
                                }}
                            >
                                Payment
                            </Btn>
                        )}
                        <Btn
                            size="sm"
                            variant={"outline"}
                            onClick={() => {
                                modal.openSheet(
                                    <SalesNoteModal id={id} orderId={orderId} />
                                );
                            }}
                        >
                            Notes
                        </Btn>
                        <SaveBtn />
                        <Evaluator />
                        <Menu Icon={Icons.more}>
                            <CopyOrderMenuAction row={{ slug, id } as any} />
                            {type == "quote" ? (
                                <>
                                    <PrintOrderMenuAction
                                        link
                                        estimate
                                        row={
                                            {
                                                type,
                                                slug: form.getValues(
                                                    "order.slug"
                                                ),
                                            } as any
                                        }
                                    />
                                </>
                            ) : (
                                <>
                                    <PrintOrderMenuAction
                                        link
                                        row={
                                            {
                                                type,
                                                slug: form.getValues(
                                                    "order.slug"
                                                ),
                                            } as any
                                        }
                                    />
                                    <PrintOrderMenuAction
                                        mockup
                                        link
                                        row={
                                            {
                                                slug: form.getValues(
                                                    "order.slug"
                                                ),
                                                type: type,
                                            } as any
                                        }
                                    />
                                    <PrintOrderMenuAction
                                        pdf
                                        row={
                                            {
                                                slug: form.getValues(
                                                    "order.slug"
                                                ),
                                                type,
                                            } as any
                                        }
                                    />
                                </>
                            )}
                            {id && (
                                <MoveSalesMenuItem
                                    id={id}
                                    type={type}
                                    orderId={orderId}
                                    isDyke={true}
                                />
                            )}

                            <MenuItem
                                onClick={() => {
                                    modal.openSheet(
                                        <DykeSettingsModal form={form} />
                                    );
                                }}
                                Icon={Icons.settings}
                            >
                                Settings
                            </MenuItem>
                            {slug && (
                                <>
                                    <SendEmailMenuAction
                                        sales={{
                                            id,
                                            slug,
                                            type,
                                            ...form.getValues(),
                                        }}
                                    />
                                    <MenuItem
                                        href={`/sales-book/edit-${type}/${orderId}?restore=true`}
                                        Icon={ArchiveRestore}
                                        className="bg-red-500 text-white"
                                    >
                                        Restore
                                    </MenuItem>
                                </>
                            )}
                            {!dealerMode && (
                                <>
                                    <MenuItem
                                        onClick={restoreFailed}
                                        Icon={ArchiveRestore}
                                        className="bg-red-500 text-white"
                                    >
                                        Restore Failed
                                    </MenuItem>
                                </>
                            )}
                        </Menu>
                    </div>
                    <div className={cn(dealerMode ? "" : "hidden")}>
                        <SaveBtn />
                    </div>
                </div>
            </div>
        </div>
    );
}
