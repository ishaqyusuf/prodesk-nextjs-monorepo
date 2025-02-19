import DevOnly from "@/_v2/components/common/dev-only";
import { Button } from "@/components/ui/button";
import { setStepsUids } from "./set-step-uids";
import {
    bootstrapDykeStepDuplicates,
    bootstrapHousePackageTools,
} from "./actions";

export default function Bootstrap() {
    return (
        <DevOnly>
            <Button
                onClick={async () => {
                    console.log(await bootstrapDykeStepDuplicates());
                }}
            >
                Bootstrap housepackage tools
            </Button>
        </DevOnly>
    );
}
