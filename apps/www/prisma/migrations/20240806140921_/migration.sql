-- AlterTable
ALTER TABLE `Customers` ADD COLUMN `isDealer` BOOLEAN NULL,
    ADD COLUMN `requestApprovedAt` TIMESTAMP(0) NULL,
    ADD COLUMN `requestRejectedAt` TIMESTAMP(0) NULL,
    ADD COLUMN `requestSubmittedAt` TIMESTAMP(0) NULL;
