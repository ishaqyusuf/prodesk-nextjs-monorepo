/*
  Warnings:

  - Made the column `housePackageToolId` on table `DykeSalesDoors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `DykeSalesDoors` MODIFY `housePackageToolId` INTEGER NOT NULL;
