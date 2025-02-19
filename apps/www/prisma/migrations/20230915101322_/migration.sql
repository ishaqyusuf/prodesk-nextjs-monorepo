-- AlterTable
ALTER TABLE `inboundorders` ADD COLUMN `reference` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(255) NULL;
