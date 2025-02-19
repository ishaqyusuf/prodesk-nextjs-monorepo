/*
  Warnings:

  - You are about to drop the column `approvedById` on the `OrderDelivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `OrderDelivery` DROP COLUMN `approvedById`,
    ADD COLUMN `createdById` INTEGER NULL,
    ADD COLUMN `driverId` INTEGER NULL,
    ADD COLUMN `orderDeliveryProgressId` INTEGER NULL;

-- AlterTable
ALTER TABLE `OrderItemDelivery` ADD COLUMN `pendingQty` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `OrderDeliveryProgress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deliveredQty` INTEGER NOT NULL DEFAULT 0,
    `pendingQty` INTEGER NOT NULL DEFAULT 0,
    `orderId` INTEGER NOT NULL,

    UNIQUE INDEX `OrderDeliveryProgress_id_key`(`id`),
    UNIQUE INDEX `OrderDeliveryProgress_orderId_key`(`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
