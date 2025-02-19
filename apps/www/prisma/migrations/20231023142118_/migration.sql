/*
  Warnings:

  - Added the required column `pickupApprovedBy` to the `SalesPickup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `salespickup` ADD COLUMN `pickupApprovedBy` INTEGER NOT NULL;
