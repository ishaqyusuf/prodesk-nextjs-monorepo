import { _modal } from "@/components/common/modal/provider";
import FormSettingsModal from "./modals/form-settings-modal";
import { useFormDataStore } from "../_common/_stores/form-data-store";
import { Sticky } from "../_hooks/use-sticky";
import { cn } from "@/lib/utils";
import {
    getSalesBookFormUseCase,
    saveFormUseCase,
} from "../../../_common/use-case/sales-book-form-use-case";
import Button from "@/components/common/button";
import { toast } from "sonner";
import { zhInitializeState } from "../_utils/helpers/zus/zus-form-helper";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { Menu } from "@/components/(clean-code)/menu";
import { PrintAction } from "../../../_common/_components/overview-sheet.bin/footer/print.action";
import { useMemo } from "react";
import { openSalesOverview } from "../../../_common/_components/sales-overview-sheet";
import { MenuIcon } from "lucide-react";
import { Label } from "@/components/ui/label";

import { DatePicker } from "@/components/_v1/date-range-picker";

export function FormHeader({ sticky }: { sticky: Sticky }) {
    const zus = useFormDataStore();
    const { isFixed, containerRef } = sticky;
    const tabs = [
        { name: "info", title: "Sales Info", default: true },
        { name: "invoice", title: "Invoice Builder" },
        { name: "address", title: "Customer Info" },
        // { name: "info", title: "Customer Info" },
    ];
    const isOld = dayjs("12/18/2024").diff(
        dayjs(zus.metaData.createdAt),
        "days"
    );
    function isActive(tab) {
        return (!zus.currentTab && tab.default) || zus.currentTab == tab.name;
    }
    async function refetchData() {
        if (!zus.metaData.salesId) return;
        const data = await getSalesBookFormUseCase({
            type: zus.metaData.type,
            slug: zus.metaData.salesId,
        });
        zus.init(zhInitializeState(data));
    }
    const printData = useMemo(() => {
        return zus.metaData.id
            ? {
                  item: {
                      type: zus.metaData.type,
                      slug: zus.metaData.salesId,
                      dispatchList: [],
                  },
              }
            : null;
    }, [zus.metaData]);
    const searchParams = useSearchParams();
    const router = useRouter();
    async function save(action: "new" | "close" | "default" = "default") {
        const { kvFormItem, kvStepForm, metaData, sequence } = zus;
        const restoreMode = searchParams.get("restoreMode") != null;

        const resp = await saveFormUseCase(
            {
                kvFormItem,
                kvStepForm,
                metaData,
                sequence,
                saveAction: action,
            },
            zus.oldFormState,
            {
                restoreMode,
                allowRedirect: true,
            }
        );
        switch (action) {
            case "close":
                router.push(`/sales-book/${metaData.type}s`);
                break;
            case "default":
                if (resp.redirectTo) {
                    console.log(resp.redirectTo);

                    router.push(resp.redirectTo);
                }
                break;
            case "new":
                router.push(`/sales-book/create-${metaData.type}`);
        }
        // console.log({ resp });
        // return;
        if (!metaData.debugMode) {
            await refetchData();
            if (resp.data?.error) toast.error(resp.data?.error);
            else {
                toast.success("Saved");
            }
        } else {
            toast.info("Debug mode");
        }
        // if(resp.redirectTo)
    }
    return (
        <div
            style={
                isFixed
                    ? {
                          left: `${
                              containerRef?.current?.getBoundingClientRect()
                                  ?.left
                          }px`,
                          width: `${
                              containerRef?.current?.getBoundingClientRect()
                                  ?.width
                          }px`,
                          //   right: `${
                          //       containerRef?.current?.getBoundingClientRect()
                          //           ?.right
                          //   }px`,
                      }
                    : {}
            }
            className={cn(
                "flex border-b items-center mb-4",
                isFixed &&
                    "fixed border-2s border sborder-muted-foreground/50 shadow-xl  overflow-hidden rounded-fulls  top-[55px] bg-background z-10"
            )}
        >
            <div className="">
                {tabs.map((tab) => (
                    <Button
                        key={tab.name}
                        size="default"
                        onClick={(e) => {
                            zus.dotUpdate("currentTab", tab.name as any);
                        }}
                        className={cn(
                            "border-b-2  border-transparent rounded-none text-muted-foreground",
                            isActive(tab)
                                ? "border-primary text-primary bg-muted"
                                : "",
                            tab.name == "address" && "lg:hidden"
                        )}
                        variant="ghost"
                    >
                        {tab.title}
                    </Button>
                ))}
            </div>
            <div className="flex-1" />
            <div className="flex gap-4 px-4 py-2 items-center">
                {isOld > 0 && (
                    <Link
                        className={cn(
                            buttonVariants({
                                variant: "destructive",
                            })
                        )}
                        href={`/sales-v2/form/${zus.metaData.type}/${zus.metaData.salesId}`}
                    >
                        Open In Old Version
                    </Link>
                )}
                <CreatedDate />
                <Button
                    size="xs"
                    icon="settings"
                    onClick={() => {
                        _modal.openSheet(<FormSettingsModal />);
                    }}
                    variant="outline"
                >
                    <span className="">Settings</span>
                </Button>

                <Button
                    size="xs"
                    disabled={!zus.metaData.id}
                    onClick={() => {
                        openSalesOverview({
                            salesId: zus.metaData.id,
                        });
                    }}
                >
                    <span className="">Overview</span>
                </Button>
                <div className="flex">
                    <Menu Icon={MenuIcon}>
                        <Menu.Item onClick={() => save("close")}>
                            Save & Close
                        </Menu.Item>
                        <Menu.Item onClick={() => save("new")}>
                            Save & New
                        </Menu.Item>
                        <Menu.Item>Copy</Menu.Item>
                        <Menu.Item disabled>Move To Sales</Menu.Item>
                        <Menu.Item disabled>Move To Quotes</Menu.Item>
                    </Menu>
                    <Button
                        icon="save"
                        size="xs"
                        action={save}
                        variant="default"
                    >
                        {/* <Icons.save className="size-4 mr-4" /> */}
                        <span className="">Save</span>
                    </Button>
                </div>
                {printData && (
                    <Menu>
                        <PrintAction data={printData} />
                        <PrintAction pdf data={printData} />
                    </Menu>
                )}
            </div>
        </div>
    );
}
function CreatedDate() {
    const zus = useFormDataStore();

    return (
        <div className="inline-flex items-center space-x-2">
            <Label>Date:</Label>
            <DatePicker
                // disabled={(date) => date > new Date()}
                setValue={(e) => {
                    // form.setValue("order.createdAt", e)
                    zus.dotUpdate("metaData.createdAt", e);
                }}
                className="w-auto h-8"
                value={zus.metaData?.createdAt}
            />
        </div>
    );
}
