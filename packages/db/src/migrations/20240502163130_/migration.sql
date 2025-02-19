/*
  Warnings:

  - You are about to drop the column `progress` on the `SalesProductionStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `SalesProductionStatus` DROP COLUMN `progress`,
    ADD COLUMN `score` DOUBLE NULL,
    ADD COLUMN `total` DOUBLE NULL;
