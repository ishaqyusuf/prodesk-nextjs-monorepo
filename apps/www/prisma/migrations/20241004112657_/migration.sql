-- AlterTable
ALTER TABLE `ComponentPrice` ADD COLUMN `grandTotal` DOUBLE NULL,
    ADD COLUMN `taxPercentage` DOUBLE NULL,
    ADD COLUMN `totalTax` DOUBLE NULL;
