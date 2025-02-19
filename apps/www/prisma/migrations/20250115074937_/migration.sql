/*
  Warnings:

  - Made the column `itemControlUid` on table `QtyControl` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `QtyControl` MODIFY `itemControlUid` VARCHAR(191) NOT NULL;
