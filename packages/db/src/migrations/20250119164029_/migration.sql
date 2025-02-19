-- AlterTable
ALTER TABLE `CustomerTransaction` ADD COLUMN `squarePID` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `SquarePayments` (
    `id` VARCHAR(191) NOT NULL,
    `paymentId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'created',
    `paymentMethod` VARCHAR(191) NOT NULL,
    `paymentLink` VARCHAR(191) NULL,
    `amount` DOUBLE NOT NULL,
    `tip` DOUBLE NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,
    `terminalId` VARCHAR(191) NULL,
    `createdById` INTEGER NOT NULL,

    UNIQUE INDEX `SquarePayments_paymentId_key`(`paymentId`),
    INDEX `SquarePayments_terminalId_idx`(`terminalId`),
    INDEX `SquarePayments_createdById_idx`(`createdById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PaymentTerminals` (
    `terminalId` VARCHAR(191) NOT NULL,
    `terminalName` VARCHAR(191) NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `PaymentTerminals_terminalId_key`(`terminalId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `CustomerTransaction_squarePID_idx` ON `CustomerTransaction`(`squarePID`);
