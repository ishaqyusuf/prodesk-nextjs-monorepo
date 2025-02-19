-- AlterTable
ALTER TABLE `SalesOrders` ADD COLUMN `customerProfileId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `SalesOrders_customerProfileId_idx` ON `SalesOrders`(`customerProfileId`);
