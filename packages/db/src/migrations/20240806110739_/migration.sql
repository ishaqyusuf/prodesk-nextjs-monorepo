-- AlterTable
ALTER TABLE `Customers` ADD COLUMN `emailVerifiedAt` TIMESTAMP(0) NULL,
    ADD COLUMN `password` VARCHAR(255) NULL;
