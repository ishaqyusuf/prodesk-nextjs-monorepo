/*
  Warnings:

  - You are about to drop the `inboundorderitems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `inboundorders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `inboundorderitems`;

-- DropTable
DROP TABLE `inboundorders`;

-- CreateTable
CREATE TABLE `SalesItemSupply` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesOrderItemId` INTEGER NOT NULL,
    `salesOrderId` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,
    `productId` INTEGER NULL,
    `meta` JSON NULL,
    `status` VARCHAR(255) NOT NULL,
    `location` VARCHAR(255) NULL,
    `supplier` VARCHAR(191) NULL,
    `putAwayBy` INTEGER NULL,
    `putawayAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `unitCost` DOUBLE NULL,
    `totalCost` DOUBLE NULL,

    UNIQUE INDEX `SalesItemSupply_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
