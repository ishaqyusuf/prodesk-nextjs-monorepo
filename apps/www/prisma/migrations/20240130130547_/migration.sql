/*
  Warnings:

  - Added the required column `salesOrderId` to the `DykeSalesDoors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesOrderId` to the `HousePackageTools` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DykeSalesDoors` ADD COLUMN `salesOrderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `HousePackageTools` ADD COLUMN `salesOrderId` INTEGER NOT NULL;
