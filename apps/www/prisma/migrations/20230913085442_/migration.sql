/*
  Warnings:

  - You are about to alter the column `amount` on the `jobs` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `jobs` MODIFY `amount` DOUBLE NOT NULL;
