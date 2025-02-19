/*
  Warnings:

  - Made the column `customerId` on table `salespayments` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `salespayments` MODIFY `customerId` INTEGER NOT NULL;
