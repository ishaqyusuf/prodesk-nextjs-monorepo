-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `paymentId` INTEGER NULL;

-- CreateTable
CREATE TABLE `JobPayments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `paidBy` INTEGER NOT NULL,
    `checkNo` VARCHAR(191) NULL,
    `paymentMethod` VARCHAR(191) NULL,
    `meta` JSON NULL,
    `createdAt` TIMESTAMP(0) NULL,
    `updatedAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `JobPayments_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
