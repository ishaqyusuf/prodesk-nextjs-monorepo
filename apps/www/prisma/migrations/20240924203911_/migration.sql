-- AlterTable
ALTER TABLE `SalesTaxes` ADD COLUMN `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `deletedAt` TIMESTAMP(0) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `Taxes` (
    `title` VARCHAR(191) NOT NULL,
    `taxCode` VARCHAR(191) NOT NULL,
    `percentage` DOUBLE NOT NULL DEFAULT 0.00,
    `taxOn` VARCHAR(191) NOT NULL DEFAULT 'total',
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Taxes_taxCode_key`(`taxCode`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
