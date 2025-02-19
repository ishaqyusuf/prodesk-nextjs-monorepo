import Modal from "@/components/common/modal";
import { _modal } from "@/components/common/modal/provider";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
    loadSalesOverviewer,
    zSalesOverview,
} from "../overview-sheet.bin/utils/store";
import { ItemProductionCard } from "./item-production-card";

type OpenProps = {
    orderId?;
    id?;
};
export function openSalesProduction(props: OpenProps) {
    loadSalesOverviewer({
        ...props,
        adminMode: false,
        Modal: ProductionModal,
    });
}
export function openAdminProductionModal(props: OpenProps) {
    loadSalesOverviewer({
        ...props,
        adminMode: true,
        Modal: ProductionModal,
    });
}
export function ProductionModal() {
    const z = zSalesOverview();

    return (
        <Modal.Content size="xl">
            <Modal.Header
                title={`Sales Production`}
                subtitle={`${z?.overview?.salesInfo?.orderId} | ${
                    z?.overview?.salesInfo?.displayName ||
                    z?.overview?.salesInfo?.customerPhone ||
                    ""
                }`}
            />
            <ScrollArea className="max-h-[80vh]">
                {z.overview?.itemGroup?.map((grp, grpId) => (
                    <div key={grpId}>
                        {grp.items?.map((item, itemId) => (
                            <ItemProductionCard
                                key={`${grpId}-${itemId}`}
                                itemUid={`${grpId}-${itemId}`}
                                item={item}
                                group={grp}
                            />
                        ))}
                    </div>
                ))}
            </ScrollArea>
        </Modal.Content>
    );
}
