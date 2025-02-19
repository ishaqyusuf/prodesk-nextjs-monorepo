/*
  Warnings:

  - You are about to alter the column `scheduleDate` on the `workorders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Timestamp(0)`.

*/
-- AlterTable
ALTER TABLE `workorders` MODIFY `scheduleDate` TIMESTAMP(0) NULL;
