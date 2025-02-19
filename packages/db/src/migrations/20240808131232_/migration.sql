-- CreateTable
CREATE TABLE `MailEventTrigger` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `when` VARCHAR(191) NOT NULL,
    `mailGridId` INTEGER NULL,
    `authorId` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `MailEventTrigger_id_key`(`id`),
    INDEX `MailEventTrigger_mailGridId_idx`(`mailGridId`),
    INDEX `MailEventTrigger_authorId_idx`(`authorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
