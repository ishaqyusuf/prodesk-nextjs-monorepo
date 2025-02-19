/*
  Warnings:

  - Made the column `dimension` on table `DykeSalesDoors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `DykeSalesDoors` MODIFY `dimension` VARCHAR(191) NOT NULL;
