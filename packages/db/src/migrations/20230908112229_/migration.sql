/*
  Warnings:

  - A unique constraint covering the columns `[walletId]` on the table `Customers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `customers` ADD COLUMN `walletId` INTEGER NULL;

-- AlterTable
ALTER TABLE `salespayments` ADD COLUMN `transactionId` INTEGER NULL;

-- CreateTable
CREATE TABLE `CustomerWallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` DOUBLE NOT NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `CustomerWallet_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerTransaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `authorId` INTEGER NOT NULL,
    `amount` DOUBLE NOT NULL,
    `walletId` INTEGER NOT NULL,
    `description` LONGTEXT NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `CustomerTransaction_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Customers_walletId_key` ON `Customers`(`walletId`);
