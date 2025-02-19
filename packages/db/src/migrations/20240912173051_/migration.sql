/*
  Warnings:

  - A unique constraint covering the columns `[salesPaymentsId]` on the table `SalesCheckout` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `SalesCheckout` ADD COLUMN `salesPaymentsId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `SalesCheckout_salesPaymentsId_key` ON `SalesCheckout`(`salesPaymentsId`);
