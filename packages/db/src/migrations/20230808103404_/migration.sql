/*
  Warnings:

  - Made the column `type` on table `inbox` required. This step will fail if there are existing NULL values in that column.
  - Made the column `body` on table `inbox` required. This step will fail if there are existing NULL values in that column.
  - Made the column `from` on table `inbox` required. This step will fail if there are existing NULL values in that column.
  - Made the column `to` on table `inbox` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `inbox` MODIFY `type` TEXT NOT NULL,
    MODIFY `body` TEXT NOT NULL,
    MODIFY `from` TEXT NOT NULL,
    MODIFY `to` TEXT NOT NULL;
