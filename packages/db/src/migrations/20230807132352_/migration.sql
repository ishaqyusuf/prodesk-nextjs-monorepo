-- AlterTable
ALTER TABLE `inbox` ADD COLUMN `from` TEXT NULL,
    ADD COLUMN `meta` JSON NULL,
    ADD COLUMN `to` TEXT NULL;
