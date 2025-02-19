"use client";
import { useDataPage } from "@/lib/data-page-context";
import { SalesOverviewType } from "../overview-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useModal } from "@/components/common/modal/provider";
import { Icons } from "@/components/_v1/icons";
import SalesNoteModal from "../../../_components/_sales-note/_modal";
import Note from "../../../_components/_sales-note/note";

export default function TimelineSection() {
    const { data } = useDataPage<SalesOverviewType>();

    const modal = useModal();
    return (
        <div className="col-span-1">
            <Card className="max-sm:border-none">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Timeline</span>
                        <div>
                            <Button
                                onClick={() => {
                                    modal.openSheet(
                                        <SalesNoteModal
                                            edit
                                            id={data.id}
                                            orderId={data.orderId}
                                        />
                                    );
                                }}
                                className="h-8 w-8 p-0"
                                variant="outline"
                            >
                                <Icons.add className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent className="">
                    {data.progress?.map((progress) => (
                        <Note key={progress.id} note={progress} />
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
