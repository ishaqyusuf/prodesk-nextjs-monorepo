import { convertToNumber, toFixed } from "@/lib/use-number";
import { ISalesSettingMeta, ISalesWizard } from "@/types/post";
import {
    FooterRowInfo,
    IFooterInfo,
    ISalesOrderForm,
    ISalesOrderItem,
    ISalesOrderItemMeta,
    WizardKvForm,
} from "@/types/sales";
export function calculateSalesInvoice({
    form,
    footerInfo,
    settings,
}: {
    footerInfo: IFooterInfo;
    form: ISalesOrderForm;
    settings: ISalesSettingMeta;
}) {
    let subTotal = 0;
    let tax = 0;
    let taxxableSubTotal = 0;
    let ccc = 0;
    // const b = form.getValues("");
    const taxPercentage = convertToNumber(form.getValues("taxPercentage"), 0);
    const cccPercentage = settings?.ccc;
    Object.entries(footerInfo.rows).map(([k, row]) => {
        if (row.total) {
            subTotal += +row.total;
            if (row.taxxable) {
                taxxableSubTotal += +row.total;
                const lineTax = +row.total * (taxPercentage / 100);
                form.setValue(`items.${row.rowIndex}.tax`, +lineTax || 0);
            }
        }
    });
    const labourCost = convertToNumber(form.getValues("meta.labor_cost"), 0);
    const discount = convertToNumber(form.getValues("meta.discount"), 0);
    let total = +toFixed(subTotal + labourCost - discount);
    if (taxxableSubTotal > 0 && taxPercentage > 0)
        tax = taxxableSubTotal * (taxPercentage / 100);
    if (
        form.getValues("meta.payment_option") == "Credit Card" &&
        cccPercentage > 0
    ) {
        ccc = +toFixed((cccPercentage / 100) * (total + tax));
    }

    form.setValue("subTotal", toFixed(subTotal));
    form.setValue("tax", toFixed(tax));
    form.setValue("meta.ccc", +ccc);
    form.setValue("meta.ccc_percentage", cccPercentage);
    form.setValue("grandTotal", toFixed(ccc + tax + total));
}
