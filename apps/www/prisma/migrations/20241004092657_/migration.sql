/*
  Warnings:

  - A unique constraint covering the columns `[priceId]` on the table `DykeSalesDoors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[priceId]` on the table `DykeStepForm` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[priceId]` on the table `HousePackageTools` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `DykeSalesDoors` ADD COLUMN `priceId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `DykeStepForm` ADD COLUMN `priceId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `HousePackageTools` ADD COLUMN `priceId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ComponentPrice` (
    `id` VARCHAR(191) NOT NULL,
    `salesItemId` INTEGER NOT NULL,
    `salesId` INTEGER NOT NULL,
    `qty` DOUBLE NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `baseUnitCost` DOUBLE NOT NULL,
    `baseTotalCost` DOUBLE NOT NULL,
    `salesUnitCost` DOUBLE NOT NULL,
    `salesTotalCost` DOUBLE NOT NULL,
    `margin` DOUBLE NOT NULL DEFAULT 1,
    `salesProfit` DOUBLE NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    INDEX `ComponentPrice_salesId_idx`(`salesId`),
    INDEX `ComponentPrice_salesItemId_idx`(`salesItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `DykeSalesDoors_priceId_key` ON `DykeSalesDoors`(`priceId`);

-- CreateIndex
CREATE UNIQUE INDEX `DykeStepForm_priceId_key` ON `DykeStepForm`(`priceId`);

-- CreateIndex
CREATE UNIQUE INDEX `HousePackageTools_priceId_key` ON `HousePackageTools`(`priceId`);
