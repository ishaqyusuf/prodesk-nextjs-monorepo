/*
  Warnings:

  - You are about to drop the column `default` on the `PageTabs` table. All the data in the column will be lost.
  - You are about to drop the column `tabIndex` on the `PageTabs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `PageTabs` DROP COLUMN `default`,
    DROP COLUMN `tabIndex`;

-- CreateTable
CREATE TABLE `PageTabIndex` (
    `id` VARCHAR(191) NOT NULL,
    `tabId` INTEGER NOT NULL,
    `tabIndex` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `default` BOOLEAN NULL DEFAULT false,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `PageTabIndex_id_key`(`id`),
    INDEX `PageTabIndex_tabId_idx`(`tabId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
