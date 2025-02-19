-- CreateTable
CREATE TABLE `DykeStepForm` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `value` VARCHAR(191) NOT NULL,
    `qty` INTEGER NULL DEFAULT 0,
    `price` DOUBLE NULL DEFAULT 0,
    `salesId` INTEGER NULL,
    `salesItemId` INTEGER NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DykeStepForm_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
