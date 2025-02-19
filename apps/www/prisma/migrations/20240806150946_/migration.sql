-- AlterTable
ALTER TABLE `DealerStatus` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `DealerToken` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;
