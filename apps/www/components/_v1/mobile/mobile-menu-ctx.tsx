"use client";

import { memo, useState } from "react";
import { Tabs, TabsContent } from "../../ui/tabs";
import { MobileMenu, MobileOption } from "./mobile-menu-item";
import optionBuilder from "@/lib/option-builder";
import { sales } from "@/lib/sales/sales-helper";
import useSalesPdf from "@/app/(v2)/printer/sales/use-sales-pdf";
import Modal from "@/components/common/modal";
import { useAssignment } from "@/app/(v2)/(loggedIn)/sales-v2/productions/_components/_modals/assignment-modal/use-assignment";
import { useModal } from "@/components/common/modal/provider";

interface Props {
    item;
}
const MobileMenuContext = ({ item }: Props) => {
    const [tab, setTab] = useState<string>("main");

    const modal = useModal();
    const pdf = useSalesPdf();

    const assignment = useAssignment();
    const [options, setOptions] = useState<any[]>(
        optionBuilder.toMobile(
            sales.salesMenuOption(item as any, modal, pdf, assignment)
        )
    );

    return (
        <Modal.Content size="sm" className="h-auto" side="bottom">
            <Modal.Header
                onBack={
                    tab != "main"
                        ? () => {
                              setTab("main");
                          }
                        : null
                }
                title={item.orderId}
            />
            <div className="-mx-4">
                <Tabs defaultValue={tab} onValueChange={setTab} className="">
                    {options.map((opt, i) => (
                        <TabsContent key={i} value={opt.name}>
                            <MobileMenu>
                                {opt.items?.map((item, j) => {
                                    return (
                                        <MobileOption
                                            key={j}
                                            {...item}
                                            more={item.more?.length}
                                            onClick={(e) => {
                                                if (item.more) {
                                                    e.preventDefault();
                                                    setTab(item.label);
                                                } else
                                                    item.onClick &&
                                                        item.onClick();
                                                modal.close();
                                            }}
                                        />
                                    );
                                })}
                            </MobileMenu>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </Modal.Content>
    );
};
export default memo(MobileMenuContext);
