/*
  Warnings:

  - You are about to drop the column `accountNo` on the `Customers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountNo]` on the table `CustomerWallet` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Customers_accountNo_key` ON `Customers`;

-- AlterTable
ALTER TABLE `CustomerWallet` ADD COLUMN `accountNo` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Customers` DROP COLUMN `accountNo`;

-- CreateTable
CREATE TABLE `Refunds` (
    `id` VARCHAR(191) NOT NULL,
    `refId` VARCHAR(191) NOT NULL,
    `salesId` INTEGER NOT NULL,
    `refundSalesId` INTEGER NULL,
    `walletId` INTEGER NOT NULL,
    `total` DOUBLE NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Refunds_id_key`(`id`),
    UNIQUE INDEX `Refunds_refundSalesId_key`(`refundSalesId`),
    INDEX `Refunds_salesId_idx`(`salesId`),
    INDEX `Refunds_walletId_idx`(`walletId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefundTransactions` (
    `id` VARCHAR(191) NOT NULL,
    `refundId` VARCHAR(191) NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `RefundTransactions_id_key`(`id`),
    INDEX `RefundTransactions_refundId_idx`(`refundId`),
    INDEX `RefundTransactions_transactionId_idx`(`transactionId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `CustomerWallet_accountNo_key` ON `CustomerWallet`(`accountNo`);
