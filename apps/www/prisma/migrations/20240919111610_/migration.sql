/*
  Warnings:

  - You are about to drop the column `orderDeliveryProgressId` on the `OrderDelivery` table. All the data in the column will be lost.
  - You are about to drop the `OrderDeliveryProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OrderProductionProgress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SalesProductionStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX `OrderDelivery_orderDeliveryProgressId_idx` ON `OrderDelivery`;

-- AlterTable
ALTER TABLE `OrderDelivery` DROP COLUMN `orderDeliveryProgressId`;

-- DropTable
DROP TABLE `OrderDeliveryProgress`;

-- DropTable
DROP TABLE `OrderProductionProgress`;

-- DropTable
DROP TABLE `SalesProductionStatus`;

-- CreateTable
CREATE TABLE `SalesStat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesId` INTEGER NOT NULL,
    `status` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `score` DOUBLE NULL,
    `total` DOUBLE NULL,
    `percentage` DOUBLE NULL,

    UNIQUE INDEX `SalesStat_id_key`(`id`),
    INDEX `SalesStat_salesId_idx`(`salesId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
