/*
  Warnings:

  - You are about to drop the `salescheckout` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `salescheckout`;

-- CreateTable
CREATE TABLE `SalesCheckout` (
    `id` VARCHAR(191) NOT NULL,
    `paymentId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `paymentType` VARCHAR(191) NOT NULL,
    `terminalId` VARCHAR(191) NULL,
    `terminalName` VARCHAR(191) NULL,
    `amount` DOUBLE NOT NULL,
    `tip` DOUBLE NULL DEFAULT 0,
    `orderId` INTEGER NOT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `SalesCheckout_paymentId_key`(`paymentId`),
    INDEX `SalesCheckout_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
