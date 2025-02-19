-- CreateTable
CREATE TABLE `NotePadEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reminderType` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `reminderDate` TIMESTAMP(0) NULL,
    `remindedAt` TIMESTAMP(0) NULL,
    `eventDate` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `notePadId` INTEGER NOT NULL,

    UNIQUE INDEX `NotePadEvent_id_key`(`id`),
    INDEX `NotePadEvent_notePadId_idx`(`notePadId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
