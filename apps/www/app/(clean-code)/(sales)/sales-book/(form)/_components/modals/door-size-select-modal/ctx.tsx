import { cn, generateRandomString, sum, toNumber } from "@/lib/utils";

import { createContext, useContext, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { _modal } from "@/components/common/modal/provider";
import { ComponentHelperClass } from "../../../_utils/helpers/zus/step-component-class";
import { formatMoney } from "@/lib/use-number";
import { Door } from "../door-swap-modal";

export const useCtx = () => useContext(DoorSizeSelectContext);
export const DoorSizeSelectContext =
    createContext<ReturnType<typeof useInitContext>>(null);

export function useInitContext(cls: ComponentHelperClass, door?: Door) {
    const swapPaths = door?.sizeList?.map((s) => s.path);
    const memoied = useMemo(() => {
        const priceModel = cls.getDoorPriceModel(cls.componentUid);

        const sizeList = priceModel.heightSizeList;
        let groupItem = cls.getItemForm().groupItem;
        const routeConfig = cls.getRouteConfig();

        const componentUid = cls.componentUid;
        const selections: {
            [id in string]: {
                salesPrice: number;
                basePrice: number;
                swing: string;
                qty: {
                    lh: number | string;
                    rh: number | string;
                    total: number | string;
                };
            };
        } = {};
        const sList = sizeList.map((sl) => {
            const path = `${componentUid}-${sl.size}`;
            const swapPath = door?.sizeList?.find((s) =>
                s.path?.endsWith(`-${sl.size}`)
            )?.path;
            const sizeData =
                groupItem?.form?.[swapPath] || groupItem?.form?.[path];
            console.log({ swapPath, sizeData });
            const basePrice =
                priceModel?.formData?.priceVariants?.[sl.size]?.price;
            let salesPrice = cls.calculateSales(basePrice);
            selections[path] = {
                salesPrice,
                basePrice,
                swing: sizeData?.swing || "",
                qty: {
                    lh: sizeData?.qty?.lh || "",
                    rh: sizeData?.qty?.rh || "",
                    total: sizeData?.qty?.total || "",
                },
            };
            return {
                path,
                ...sl,
            };
        });
        return { selections, sList, priceModel, routeConfig };
    }, [cls]);
    const { selections, sList, priceModel, routeConfig } = memoied;
    const form = useForm({
        defaultValues: {
            selections,
        },
    });
    function updateDoorForm(clear = false) {
        const data = form.getValues();
        let groupItem = cls.getItemForm().groupItem;
        if (!groupItem && !clear) {
            groupItem = {
                type: "HPT",
                form: {},
                itemIds: [],
                stepUid: cls.stepUid,
                itemType: cls.getItemType(),
                pricing: {},
                qty: {
                    lh: 0,
                    rh: 0,
                    total: 0,
                },
            };
        }
        groupItem.doorStepProductId = cls.component.id;
        if (clear) groupItem = null as any;
        else {
            const _uids = Object.keys(data.selections);
            groupItem.itemIds = groupItem.itemIds.filter(
                (id) => !_uids.includes(id) && !swapPaths?.includes(id)
            );
            swapPaths?.map((p) => {
                delete groupItem.form[p];
            });
            Object.entries(data.selections).map(([uid, data]) => {
                const s = sum([data.qty.lh, data.qty.rh]);
                if (!data.qty.total && s) {
                    data.qty.total = s;
                }
                const selected = !data.qty.total == false;
                if (selected && !clear) {
                    groupItem.itemIds.push(uid);
                    groupItem.form[uid] = {
                        stepProductId: {
                            id: cls.component.id,
                        },
                        meta: {
                            description: "",
                            produceable: false,
                            taxxable: false,
                        },
                        ...(groupItem.form[uid] || {}),
                        swing: data.swing,
                        qty: data.qty,
                        selected: true,
                        pricing: {
                            addon: "",
                            customPrice: "",
                            ...(groupItem.form[uid]?.pricing || {}),
                            itemPrice: {
                                salesPrice: data?.salesPrice,
                                basePrice: data?.basePrice,
                            },
                            unitPrice: formatMoney(
                                sum([
                                    groupItem?.pricing?.components?.salesPrice,
                                    data?.salesPrice,
                                ])
                            ),
                        },
                    };
                } else {
                    delete groupItem.form[uid];
                }
            });
            groupItem.qty = {
                lh: 0,
                rh: 0,
                total: 0,
            };
            Object.entries(groupItem.form).map(([k, v]) => {
                groupItem.qty.lh += toNumber(v.qty.lh);
                groupItem.qty.rh += toNumber(v.qty.rh);
                groupItem.qty.total += toNumber(v.qty.total);
            });
        }
        cls.dotUpdateItemForm("groupItem", groupItem);
        cls.updateComponentCost();
        cls.updateGroupedCost();
        cls.calculateTotalPrice();
        return groupItem;
    }
    function removeSelection() {
        updateDoorForm(true);
        _modal.close();
    }
    function pickMore() {
        updateDoorForm();
        _modal.close();
    }
    const [openPriceForm, setOpenPriceForm] = useState({});

    function nextStep() {
        updateDoorForm();
        cls.nextStep();
        _modal.close();
    }
    function swapDoor() {
        updateDoorForm();
        _modal.close();
        cls.dotUpdateItemForm("swapUid", generateRandomString());
    }
    function priceChanged(size, price) {
        form.setValue(
            `selections.${cls.componentUid}-${size}.basePrice`,
            price
        );
        form.setValue(
            `selections.${cls.componentUid}-${size}.salesPrice`,
            cls.calculateSales(price)
        );
    }

    return {
        form,
        priceChanged,
        removeSelection,
        cls,
        swapDoor,
        priceModel,
        nextStep,
        pickMore,
        sizeList: sList,
        routeConfig,
        openPriceForm,
        togglePriceForm(uid) {
            setOpenPriceForm((prev) => {
                console.log({ prev });
                const newState = {
                    [uid]: !prev?.[uid],
                };
                Object.entries({ ...prev }).map(([k, v]) => {
                    if (k != uid) newState[k] = false;
                });

                return newState;
            });
        },
    };
}
