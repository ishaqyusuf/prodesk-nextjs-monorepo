/*
  Warnings:

  - You are about to drop the column `slug` on the `ErrorLog` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `ErrorTags` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `ErrorLog_slug_key` ON `ErrorLog`;

-- AlterTable
ALTER TABLE `ErrorLog` DROP COLUMN `slug`,
    ADD COLUMN `data` VARCHAR(191) NULL,
    ADD COLUMN `description` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Note` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `note` VARCHAR(191) NULL,
    `createdById` INTEGER NOT NULL,
    `resolvedById` INTEGER NULL,
    `visibility` VARCHAR(191) NULL,
    `flagId` INTEGER NOT NULL,
    `replyToNoteId` INTEGER NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Note_id_key`(`id`),
    INDEX `Note_flagId_idx`(`flagId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NoteFlags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NULL,
    `resolveRequired` BOOLEAN NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `NoteFlags_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SalesNote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `noteId` INTEGER NOT NULL,
    `replyToNoteId` INTEGER NULL,
    `salesId` INTEGER NOT NULL,
    `salesItemId` INTEGER NULL,
    `assignmentId` INTEGER NULL,
    `deliveryId` INTEGER NULL,
    `resolvedAt` TIMESTAMP(0) NULL,
    `deletedAt` TIMESTAMP(0) NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(3) NULL,

    UNIQUE INDEX `SalesNote_id_key`(`id`),
    UNIQUE INDEX `SalesNote_noteId_key`(`noteId`),
    UNIQUE INDEX `SalesNote_replyToNoteId_key`(`replyToNoteId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ErrorTags_name_key` ON `ErrorTags`(`name`);
