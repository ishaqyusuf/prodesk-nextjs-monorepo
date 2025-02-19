-- AlterTable
ALTER TABLE `salesorders` ADD COLUMN `pickupId` INTEGER NULL;

-- CreateTable
CREATE TABLE `SalesPickup` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pickupBy` VARCHAR(191) NULL,
    `meta` JSON NULL,
    `pickupAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `SalesPickup_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
