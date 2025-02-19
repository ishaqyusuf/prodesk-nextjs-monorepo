-- AlterTable
ALTER TABLE `DealerAuth` ADD COLUMN `primaryBillingAddressId` INTEGER NULL,
    ADD COLUMN `primaryShippingAddressId` INTEGER NULL;
