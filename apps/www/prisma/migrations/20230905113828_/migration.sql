/*
  Warnings:

  - The `completedAt` column on the `hometasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `hometasks` DROP COLUMN `completedAt`,
    ADD COLUMN `completedAt` DATETIME(3) NULL;
