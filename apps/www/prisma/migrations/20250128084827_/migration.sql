/*
  Warnings:

  - You are about to drop the column `createdAt` on the `NoteComments` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `NotePad` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `NoteComments` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `NotePad` DROP COLUMN `createdAt`;
