-- AlterTable
ALTER TABLE `Event` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `PageView` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;
