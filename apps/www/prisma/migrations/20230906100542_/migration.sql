/*
  Warnings:

  - You are about to alter the column `requestDate` on the `workorders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `workorders` MODIFY `requestDate` DATETIME(3) NULL;
