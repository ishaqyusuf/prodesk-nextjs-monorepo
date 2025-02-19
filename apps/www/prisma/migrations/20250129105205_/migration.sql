/*
  Warnings:

  - Added the required column `senderContactId` to the `NotePad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `NotePad` ADD COLUMN `headline` VARCHAR(191) NULL,
    ADD COLUMN `senderContactId` INTEGER NOT NULL,
    ADD COLUMN `subject` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'private';

-- AlterTable
ALTER TABLE `NoteTags` ADD COLUMN `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `deletedAt` TIMESTAMP(0) NULL;

-- CreateTable
CREATE TABLE `NoteRecipients` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `notePadId` INTEGER NOT NULL,
    `notePadContactId` INTEGER NOT NULL,

    UNIQUE INDEX `NoteRecipients_id_key`(`id`),
    INDEX `NoteRecipients_notePadId_idx`(`notePadId`),
    INDEX `NoteRecipients_notePadContactId_idx`(`notePadContactId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotePadContacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NULL,
    `phoneNo` VARCHAR(191) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `NotePadContacts_id_key`(`id`),
    UNIQUE INDEX `NotePadContacts_name_email_phoneNo_key`(`name`, `email`, `phoneNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `NotePad_senderContactId_idx` ON `NotePad`(`senderContactId`);
