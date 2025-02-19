import { isEqual } from "lodash";
import { SaveSalesClass } from "./save-sales-class";
import { Prisma } from "@/db";
import { prisma } from "@/db";
import { AddressBookMeta } from "../../../types";
import { connectedSalesCountDta } from "../sales-address-dta";
export class AddressClass {
    constructor(public ctx: SaveSalesClass) {}

    public async saveAddress() {
        const data = this.checkAddressUpdate();

        if (data) {
            const { billing, shipping, sameAddress, customer } = data;
            if (this.ctx.query?.copy) {
                this.ctx.data.billingAddressId = billing?.id;
                this.ctx.data.shippingAddressId = shipping?.id;
                this.ctx.data.customerId = customer?.id;
                return;
            }
            const customerData: Prisma.CustomersCreateManyInput = {
                name: customer.isBusiness ? null : billing.name,
                businessName: !customer.isBusiness
                    ? null
                    : customer.businessName,
                // businessName: customer.businessName,
                phoneNo: billing.primaryPhone,
                phoneNo2: billing.secondaryPhone,
                email: billing.email,
            };
            Object.entries(customerData).map(([k, v]) => {
                if (!v) delete customerData[k];
            });

            if (Object.keys(customerData).length == 0) {
                return;
            }
            const _customer = await prisma.customers.upsert({
                where: {
                    phoneNo: customerData.phoneNo,
                },
                create: customerData,
                update: customerData,
            });
            const customerChanged = _customer.id != this.ctx.form.metaData.cad;

            if (
                customerChanged ||
                (_customer.id && !this.ctx.form.metaData.id)
            ) {
                this.ctx.data.customerId = _customer.id;
            }
            await this.__saveAddress(billing, "billing");
            await this.__saveAddress(shipping, "shipping");
        } else {
            const form = this.ctx.form.metaData;
            const { billing, shipping, sameAddress, customer } = form;

            this.ctx.data.billingAddressId = billing?.id;
            this.ctx.data.shippingAddressId = shipping?.id;
        }
    }
    public get customerId() {
        return this.ctx.data.customerId || this.ctx.form.metaData.customer.id;
    }
    public async __saveAddress(billing, address: "billing" | "shipping") {
        if (this.sameAddress && address == "shipping") return;
        const meta = {
            zip_code: billing.zipCode,
        } as AddressBookMeta;
        const _billingData = {
            address1: billing.address1,
            phoneNo: billing.primaryPhone,
            phoneNo2: billing.secondaryPhone,
            city: billing.city,
            state: billing.state,
            meta: meta as any,
            name: billing.name,
            email: billing.email,
            customer: this.customerId
                ? {
                      connect: { id: this.customerId },
                  }
                : undefined,
        } satisfies Prisma.AddressBooksUpdateInput;
        let addressId;
        if (billing.id) {
            const salesCount = await connectedSalesCountDta(
                billing.id,
                this.ctx.form?.metaData?.id,
            );
            console.log({ salesCount });

            if (!salesCount) {
                const b = await prisma.addressBooks.update({
                    where: { id: billing.id },
                    data: {
                        ..._billingData,
                    },
                });
                addressId = b.id;
            }
        }
        if (!addressId) {
            const b = await prisma.addressBooks.create({
                data: {
                    ..._billingData,
                },
            });
            addressId = b.id;
        }
        this.ctx.data[`${address}AddressId`] = addressId;
        if (this.sameAddress && address == "billing")
            this.ctx.data.shippingAddressId = addressId;
    }
    public get sameAddress() {
        return this.ctx.form.metaData.sameAddress;
    }
    public checkAddressUpdate() {
        const oldForm = this.ctx.oldFormState?.metaData || ({} as any);
        const form = this.ctx.form.metaData;
        const { billing, shipping, sameAddress, customer } = form;
        console.log({ billing, shipping, sameAddress });
        if (
            !isEqual(
                {
                    billing,
                    shipping,
                    sameAddress,
                    customer,
                },
                {
                    billing: oldForm.billing,
                    shipping: oldForm.shipping,
                    sameAddress: oldForm.sameAddress,
                    customer: oldForm.customer,
                },
            )
        ) {
            return { billing, shipping, sameAddress, customer };
        }
        return null;
        // const billing = form.metaData.billing;
        // const shipping = form.metaData.shipping;
    }
}
