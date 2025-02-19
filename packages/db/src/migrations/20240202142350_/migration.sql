-- AlterTable
ALTER TABLE `HousePackageTools` ADD COLUMN `dykeDoorId` INTEGER NULL;

-- CreateTable
CREATE TABLE `DykeDoors` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `query` VARCHAR(191) NULL,
    `title` VARCHAR(191) NOT NULL,
    `img` VARCHAR(191) NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `DykeDoors_id_key`(`id`),
    UNIQUE INDEX `DykeDoors_title_key`(`title`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
