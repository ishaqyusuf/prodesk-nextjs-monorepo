-- CreateTable
CREATE TABLE `DykeSalesError` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `errorId` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,
    `meta` JSON NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `DykeSalesError_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
