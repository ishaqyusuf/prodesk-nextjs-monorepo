-- AlterTable
ALTER TABLE `CheckoutTenders` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `ErrorLogTags` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `ErrorTags` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `ModelHasPermissions` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `ModelHasRoles` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `PasswordResets` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `SalesItemControl` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- AlterTable
ALTER TABLE `Session` ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- CreateTable
CREATE TABLE `GitTasks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `GitTasks_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GitTaskStatus` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `current` BOOLEAN NOT NULL DEFAULT false,
    `status` VARCHAR(191) NOT NULL,
    `taskId` INTEGER NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `GitTaskStatus_id_key`(`id`),
    INDEX `GitTaskStatus_taskId_idx`(`taskId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GitTaskTags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tagId` INTEGER NOT NULL,
    `gitTaskId` INTEGER NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `GitTaskTags_id_key`(`id`),
    INDEX `GitTaskTags_gitTaskId_idx`(`gitTaskId`),
    INDEX `GitTaskTags_tagId_idx`(`tagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Tags_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
