-- AlterTable
ALTER TABLE `Homes` ADD COLUMN `sentToProdAt` TIMESTAMP(0) NULL;

-- CreateTable
CREATE TABLE `DykeShelfCategories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NULL,

    UNIQUE INDEX `DykeShelfCategories_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DykeShelfProducts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `unitPrice` DOUBLE NULL,
    `categoryId` INTEGER NULL,
    `parentCategoryId` INTEGER NULL,
    `img` VARCHAR(191) NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DykeShelfProducts_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
