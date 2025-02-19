/*
  Warnings:

  - Added the required column `categoryId` to the `DykeProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DykeProducts` ADD COLUMN `categoryId` INTEGER NOT NULL;
