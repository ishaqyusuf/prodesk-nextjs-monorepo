/*
  Warnings:

  - You are about to drop the `DealerStatus` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `DealerAuth` ADD COLUMN `status` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `DealerStatus`;

-- CreateTable
CREATE TABLE `DealerStatusHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dealerId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DealerStatusHistory_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
