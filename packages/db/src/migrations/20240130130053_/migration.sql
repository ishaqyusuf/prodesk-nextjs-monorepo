-- CreateTable
CREATE TABLE `HousePackageTools` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesOrderItemsId` INTEGER NOT NULL,
    `height` VARCHAR(191) NOT NULL,
    `doorId` INTEGER NULL,
    `jambSizeId` INTEGER NULL,
    `casingId` INTEGER NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `HousePackageTools_id_key`(`id`),
    UNIQUE INDEX `HousePackageTools_salesOrderItemsId_key`(`salesOrderItemsId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DykeSalesDoors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dimension` VARCHAR(191) NULL,
    `housePackageToolId` INTEGER NULL,
    `doorPrice` DOUBLE NULL,
    `jambSizePrice` DOUBLE NULL,
    `casingPrice` DOUBLE NULL,
    `unitPrice` DOUBLE NULL,
    `lhQty` INTEGER NOT NULL DEFAULT 0,
    `rhQty` INTEGER NOT NULL DEFAULT 0,
    `totalQty` INTEGER NOT NULL DEFAULT 0,
    `lineTotal` DOUBLE NULL DEFAULT 0,
    `salesOrderItemId` INTEGER NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DykeSalesDoors_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
