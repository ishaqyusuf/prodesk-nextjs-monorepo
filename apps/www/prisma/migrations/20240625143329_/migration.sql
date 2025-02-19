/*
  Warnings:

  - You are about to drop the column `pendingQty` on the `OrderItemDelivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `OrderItemDelivery` DROP COLUMN `pendingQty`,
    ADD COLUMN `lhQty` INTEGER NULL DEFAULT 0,
    ADD COLUMN `orderProductionSubmissionId` INTEGER NULL,
    ADD COLUMN `rhQty` INTEGER NULL DEFAULT 0;

-- CreateIndex
CREATE INDEX `OrderItemDelivery_orderProductionSubmissionId_idx` ON `OrderItemDelivery`(`orderProductionSubmissionId`);
