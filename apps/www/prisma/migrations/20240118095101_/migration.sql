-- AlterTable
ALTER TABLE `DykeSteps` ADD COLUMN `prevStepValueId` INTEGER NULL,
    ADD COLUMN `rootStepValueId` INTEGER NULL,
    ADD COLUMN `stepValueId` INTEGER NULL;

-- CreateTable
CREATE TABLE `DykeStepValues` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DykeStepValues_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
