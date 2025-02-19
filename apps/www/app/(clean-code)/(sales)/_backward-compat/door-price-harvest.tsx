import {
    harvestDoorPricingUseCase,
    saveHarvestedDoorPricingUseCase,
} from "@/app/(clean-code)/(sales)/_common/use-case/step-component-use-case";
import { Menu } from "@/components/(clean-code)/menu";
import { Button } from "@/components/ui/button";
import { chunker } from "@/lib/chunker";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function DoorPriceHarvest({}) {
    function woker() {
        harvestDoorPricingUseCase().then((list) => {
            chunker({
                worker: saveHarvestedDoorPricingUseCase,
                list,
            });
        });
    }
    return (
        <Menu.Item disabled onClick={woker}>
            Scrape Door Price
        </Menu.Item>
    );
}
