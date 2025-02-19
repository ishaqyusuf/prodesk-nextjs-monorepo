/*
  Warnings:

  - You are about to drop the column `emailVerifiedAt` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the column `isDealer` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the column `requestApprovedAt` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the column `requestRejectedAt` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the column `requestSubmittedAt` on the `Customers` table. All the data in the column will be lost.
  - You are about to drop the `DealersToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DealersValidation` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `Customers` DROP COLUMN `emailVerifiedAt`,
    DROP COLUMN `isDealer`,
    DROP COLUMN `password`,
    DROP COLUMN `requestApprovedAt`,
    DROP COLUMN `requestRejectedAt`,
    DROP COLUMN `requestSubmittedAt`;

-- DropTable
DROP TABLE `DealersToken`;

-- DropTable
DROP TABLE `DealersValidation`;

-- CreateTable
CREATE TABLE `DealerAuth` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dealerId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(255) NULL,
    `emailVerifiedAt` TIMESTAMP(0) NULL,
    `approvedAt` TIMESTAMP(0) NULL,
    `rejectedAt` TIMESTAMP(0) NULL,
    `restricted` BOOLEAN NULL,
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DealerAuth_id_key`(`id`),
    UNIQUE INDEX `DealerAuth_dealerId_key`(`dealerId`),
    UNIQUE INDEX `DealerAuth_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DealerStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dealerId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `DealerStatus_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DealerToken` (
    `dealerId` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiredAt` TIMESTAMP(0) NULL,
    `consumedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DealerToken_token_key`(`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
