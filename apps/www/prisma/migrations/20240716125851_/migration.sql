-- AlterTable
ALTER TABLE `DykeDoors` ADD COLUMN `price` DOUBLE NULL;

-- CreateTable
CREATE TABLE `OrderProductionProgress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    UNIQUE INDEX `OrderProductionProgress_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
