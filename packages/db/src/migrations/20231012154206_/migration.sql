/*
  Warnings:

  - You are about to drop the column `paidAt` on the `salesorders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `salesorders` DROP COLUMN `paidAt`,
    ADD COLUMN `inventoryStatus` VARCHAR(255) NULL;
