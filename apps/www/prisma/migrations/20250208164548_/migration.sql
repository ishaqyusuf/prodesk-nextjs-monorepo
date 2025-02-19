-- CreateTable
CREATE TABLE `NotePadReadReceipt` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `notePadContactId` INTEGER NOT NULL,
    `notePadId` INTEGER NOT NULL,

    UNIQUE INDEX `NotePadReadReceipt_id_key`(`id`),
    INDEX `NotePadReadReceipt_notePadContactId_idx`(`notePadContactId`),
    INDEX `NotePadReadReceipt_notePadId_idx`(`notePadId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
