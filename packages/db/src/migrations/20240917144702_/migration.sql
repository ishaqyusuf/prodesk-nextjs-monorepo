/*
  Warnings:

  - Added the required column `squarePaymentId` to the `CheckoutTenders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CheckoutTenders` ADD COLUMN `squarePaymentId` VARCHAR(191) NOT NULL;
