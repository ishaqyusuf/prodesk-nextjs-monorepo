-- CreateTable
CREATE TABLE `SalesStat` (
    `salesId` INTEGER NOT NULL,
    `status` VARCHAR(191) NULL,
    `type` VARCHAR(191) NOT NULL,
    `score` DOUBLE NULL,
    `total` DOUBLE NULL,
    `percentage` DOUBLE NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deletedAt` TIMESTAMP(0) NULL,

    INDEX `SalesStat_salesId_idx`(`salesId`),
    UNIQUE INDEX `SalesStat_salesId_type_key`(`salesId`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
