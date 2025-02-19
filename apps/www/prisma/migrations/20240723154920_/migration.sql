/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `DykeStepProducts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `DykeSteps` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `DykeStepProducts` ADD COLUMN `uid` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `DykeSteps` ADD COLUMN `uid` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `DykePricingSystem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dykeStepId` INTEGER NOT NULL,
    `dependenciesUid` VARCHAR(191) NOT NULL,
    `stepProductUid` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DykePricingSystem_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `DykeStepProducts_uid_key` ON `DykeStepProducts`(`uid`);

-- CreateIndex
CREATE UNIQUE INDEX `DykeSteps_uid_key` ON `DykeSteps`(`uid`);
