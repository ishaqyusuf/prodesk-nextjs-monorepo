-- AlterTable
ALTER TABLE `OrderProductionSubmissions` ADD COLUMN `assignmentId` INTEGER NULL;

-- CreateTable
CREATE TABLE `OrderItemProductionAssignments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itemId` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `assignedToId` INTEGER NOT NULL,
    `assignedById` INTEGER NOT NULL,
    `qtyAssigned` INTEGER NULL,
    `note` VARCHAR(191) NULL,
    `dueDate` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `OrderItemProductionAssignments_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
