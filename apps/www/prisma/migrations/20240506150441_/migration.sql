/*
  Warnings:

  - You are about to drop the column `leftHandle` on the `OrderProductionSubmissions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `OrderProductionSubmissions` DROP COLUMN `leftHandle`,
    ADD COLUMN `lhQty` INTEGER NULL DEFAULT 0,
    ADD COLUMN `rhQty` INTEGER NULL DEFAULT 0;
