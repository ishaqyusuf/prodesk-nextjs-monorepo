-- CreateTable
CREATE TABLE `DealersValidation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dealerId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `validatedById` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `DealersValidation_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DealersToken` (
    `dealerId` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expiredAt` TIMESTAMP(0) NULL,
    `consumedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DealersToken_token_key`(`token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
