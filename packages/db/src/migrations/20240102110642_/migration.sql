-- AlterTable
ALTER TABLE `DykeShelfCategories` ADD COLUMN `parentCategoryId` INTEGER NULL;

-- CreateTable
CREATE TABLE `DykeSalesShelfItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `salesOrderItemId` INTEGER NULL,
    `productId` INTEGER NULL,
    `qty` INTEGER NULL,
    `unitPrice` INTEGER NULL,
    `totalPrice` INTEGER NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DykeSalesShelfItem_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
