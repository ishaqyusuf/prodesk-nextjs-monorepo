-- AlterTable
ALTER TABLE `communitymodelcost` ADD COLUMN `pivotId` INTEGER NULL;

-- AlterTable
ALTER TABLE `communitymodels` ADD COLUMN `pivotId` INTEGER NULL;

-- CreateTable
CREATE TABLE `CommunityModelPivot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `model` VARCHAR(255) NOT NULL,
    `projectId` INTEGER NOT NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `CommunityModelPivot_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
