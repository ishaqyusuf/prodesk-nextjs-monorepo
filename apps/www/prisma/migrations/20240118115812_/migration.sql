/*
  Warnings:

  - Added the required column `stepId` to the `DykeStepForm` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DykeStepForm` ADD COLUMN `stepId` INTEGER NOT NULL;
