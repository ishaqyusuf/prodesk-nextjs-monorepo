-- AlterTable
ALTER TABLE `salesorders` ADD COLUMN `goodUntil` DATETIME(3) NULL,
    ADD COLUMN `paymentTerm` VARCHAR(191) NULL;
