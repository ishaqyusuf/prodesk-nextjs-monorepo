/*
  Warnings:

  - Added the required column `message` to the `Notifications` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `notifications` ADD COLUMN `archivedAt` TIMESTAMP(0) NULL,
    ADD COLUMN `link` TEXT NULL,
    ADD COLUMN `message` VARCHAR(191) NOT NULL;
