/*
  Warnings:

  - You are about to drop the column `approvedById` on the `OrderItemDelivery` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `OrderItemDelivery` DROP COLUMN `approvedById`,
    ADD COLUMN `orderDeliveryId` INTEGER NULL;

-- AlterTable
ALTER TABLE `SalesOrders` ADD COLUMN `deliveryProgress` DOUBLE NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `OrderDelivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesOrderId` INTEGER NOT NULL,
    `deliveredTo` VARCHAR(191) NULL,
    `deliveryMode` VARCHAR(191) NOT NULL,
    `approvedById` INTEGER NOT NULL,
    `meta` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `OrderDelivery_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
