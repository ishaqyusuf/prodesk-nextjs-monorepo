/*
  Warnings:

  - Added the required column `categoryId` to the `DykeSalesShelfItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DykeSalesShelfItem` ADD COLUMN `categoryId` INTEGER NOT NULL;
