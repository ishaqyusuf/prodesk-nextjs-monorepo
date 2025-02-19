"use server";

import { getDykeFormAction } from "@/app/(v2)/(loggedIn)/sales-v2/form/_action/get-dyke-form";
import { removeKeys } from "@/lib/utils";
import { ISalesType } from "@/types/sales";

export async function copyDykeSales(slug, as: ISalesType) {
    const form = await getDykeFormAction(as, slug);
    // form.order.id;
    const data = removeKeys(form, []);
    // console.log(data.grandTotal);

    data.paidAmount = 0;
    const formData = {
        ...data,
        order: removeKeys(data.order, [
            "id",
            "slug",
            "orderId",
            "salesRepId",
            // "customerId",
            // "shippingAddressId",
            // "billingAddressId",
            "createdAt",
            "updatedAt",
        ]),
        itemArray: [
            ...data.itemArray.map((itemA) => {
                const multiComponent = itemA.multiComponent;
                if (multiComponent?.components) {
                    Object.entries(multiComponent.components).map(([k, v]) => {
                        multiComponent.components[k] = removeKeys(v, [
                            "itemId",
                            "hptId",
                            // "toolId",
                        ]);
                        const df = multiComponent?.components?.[k]?._doorForm;
                        if (df) {
                            Object.entries(df).map(([k1, v1]) => {
                                df[k1] = removeKeys(v1, [
                                    "id",
                                    "salesOrderId",
                                    "salesOrderItemId",
                                    "housePackageToolId",
                                ]);
                            });
                        }
                        (multiComponent.components[k] as any)._doorForm = df;
                    });
                }
                const _doorForm = itemA.item.housePackageTool?._doorForm;
                const _doorFormDefaultValue =
                    itemA.item.housePackageTool?._doorFormDefaultValue;
                if (_doorForm) {
                    Object.entries(_doorForm).map(([k, v]) => {
                        _doorForm[k] = removeKeys(v, [
                            "id",
                            "salesOrderId",
                            "salesOrderItemId",
                            "housePackageToolId",
                        ] as any);
                    });
                }
                if (_doorFormDefaultValue) {
                    Object.entries(_doorFormDefaultValue).map(([k, v]) => {
                        _doorFormDefaultValue[k] = removeKeys(v, ["id"]);
                    });
                }
                const shelfItemArray = itemA.item.shelfItemArray.map((sh) => {
                    return {
                        ...sh,
                        productArray: sh.productArray.map((p) => {
                            return {
                                ...p,
                                item: removeKeys(p.item, [
                                    "id",
                                    "salesOrderItemId",
                                ]),
                            };
                        }),
                    };
                });
                return {
                    ...itemA,
                    multiComponent,
                    item: {
                        ...removeKeys(itemA.item, ["id", "salesOrderId"]),
                        housePackageTool: !itemA.item.housePackageTool
                            ? itemA.item.housePackageTool
                            : {
                                  ...removeKeys(itemA.item.housePackageTool, [
                                      "id",
                                      "orderItemId",
                                      "salesOrderId",
                                  ]),
                                  doors: itemA.item.housePackageTool.doors?.map(
                                      (door) =>
                                          removeKeys(door, [
                                              "id",
                                              "housePackageToolId",
                                              "salesOrderId",
                                              "salesOrderItemId",
                                          ])
                                  ),
                                  door: removeKeys(
                                      itemA.item.housePackageTool.door,
                                      ["id"] as any
                                  ),
                                  _doorForm,
                                  _doorFormDefaultValue,
                              },
                        formStepArray: itemA.item.formStepArray.map((f) => {
                            return {
                                ...f,
                                item: removeKeys(f.item, [
                                    "id",
                                    "salesItemId",
                                    "salesId",
                                ]),
                            };
                        }),
                        shelfItemArray,
                    },
                };
            }),
        ],
    };

    return formData;
    // data.salesRep.id = form.salesRep?.id as any;
    // const e = initDykeSaving(data, true);
    // console.log(e.order.grandTotal);
    // return;
    // try {
    //     // console.log(data);
    //     // return data;
    //     const { order: resp, createHpts } = await saveDykeSales(formData);
    //     // form.order.id
    //     console.log(resp);
    //     return { resp };
    //     let link = `/sales-v2/overview/${resp.type}/${resp.slug}`;
    //     return {
    //         link,
    //     };
    // } catch (error) {
    //     console.log(error);
    //     // return {
    //     //     // error: error.message,
    //     //     data,
    //     //     form,
    //     // };
    // }
}
