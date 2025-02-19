/*
  Warnings:

  - Made the column `projectId` on table `homes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `homes` MODIFY `projectId` INTEGER NOT NULL;
