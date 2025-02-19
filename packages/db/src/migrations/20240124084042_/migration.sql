-- CreateTable
CREATE TABLE `DykeShelfProductVariants` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shelfProductId` INTEGER NULL,
    `dykeProductId` INTEGER NULL,
    `title` VARCHAR(191) NOT NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DykeShelfProductVariants_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
