-- AlterTable
ALTER TABLE `SalesPayments` ADD COLUMN `status` VARCHAR(191) NULL,
    ADD COLUMN `tip` DOUBLE NULL;

-- CreateTable
CREATE TABLE `SalesCheckout` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `paymentType` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `tip` DOUBLE NULL DEFAULT 0,
    `orderId` INTEGER NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `SalesCheckout_id_key`(`id`),
    INDEX `SalesCheckout_orderId_idx`(`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
