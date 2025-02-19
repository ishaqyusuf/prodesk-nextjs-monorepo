-- CreateTable
CREATE TABLE `SalesTaxes` (
    `id` VARCHAR(191) NOT NULL,
    `salesId` INTEGER NOT NULL,
    `taxCode` VARCHAR(191) NOT NULL,
    `taxxable` DOUBLE NOT NULL,
    `tax` DOUBLE NOT NULL DEFAULT 0,

    INDEX `SalesTaxes_salesId_idx`(`salesId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
