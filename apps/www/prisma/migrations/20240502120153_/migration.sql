-- CreateTable
CREATE TABLE `SalesProductionStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `status` VARCHAR(191) NULL,
    `progress` DOUBLE NULL,

    UNIQUE INDEX `SalesProductionStatus_id_key`(`id`),
    UNIQUE INDEX `SalesProductionStatus_orderId_key`(`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
