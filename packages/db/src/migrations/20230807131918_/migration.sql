-- CreateTable
CREATE TABLE `Inbox` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clientId` INTEGER NULL,
    `senderId` INTEGER NOT NULL,
    `subject` TEXT NULL,
    `type` TEXT NULL,
    `body` TEXT NULL,
    `sentAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL,

    UNIQUE INDEX `Inbox_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
