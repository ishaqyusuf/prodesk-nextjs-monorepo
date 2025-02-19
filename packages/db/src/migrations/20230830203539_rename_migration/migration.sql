/*
  Warnings:

  - You are about to drop the column `retailCost` on the `salesorderitems` table. All the data in the column will be lost.
  - You are about to drop the `tasks` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `salesorderitems` DROP COLUMN `retailCost`;

-- DropTable
DROP TABLE `tasks`;

-- CreateTable
CREATE TABLE `Jobs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `homeId` INTEGER NULL,
    `unitId` INTEGER NULL,
    `projectId` INTEGER NULL,
    `taskId` INTEGER NULL,
    `amount` INTEGER NOT NULL,
    `title` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `description` LONGTEXT NULL,
    `note` TEXT NULL,
    `doneBy` VARCHAR(255) NULL,
    `status` VARCHAR(255) NOT NULL,
    `meta` JSON NULL,
    `adminNote` TEXT NULL,
    `statusDate` TIMESTAMP(0) NULL,
    `rejectedAt` TIMESTAMP(0) NULL,
    `approvedAt` TIMESTAMP(0) NULL,
    `paidAt` TIMESTAMP(0) NULL,
    `approvedBy` INTEGER NULL,
    `paidBy` INTEGER NULL,
    `paymentId` INTEGER NULL,
    `checkNo` VARCHAR(255) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Jobs_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
