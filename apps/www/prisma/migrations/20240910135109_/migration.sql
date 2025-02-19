/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `SalesCheckout` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `SalesCheckout_id_key` ON `SalesCheckout`;

-- AlterTable
ALTER TABLE `SalesCheckout` ADD COLUMN `paymentId` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `SalesCheckout_paymentId_key` ON `SalesCheckout`(`paymentId`);
