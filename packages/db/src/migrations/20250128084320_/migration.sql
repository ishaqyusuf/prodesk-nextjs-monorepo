/*
  Warnings:

  - You are about to alter the column `createdAt` on the `NoteComments` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `NotePad` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `NoteComments` MODIFY `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `NotePad` MODIFY `createdAt` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP(3);
