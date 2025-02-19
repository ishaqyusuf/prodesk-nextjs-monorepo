/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `InboundOrders` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `inboundorderitems` ADD COLUMN `inboundOrdersId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `InboundOrders_slug_key` ON `InboundOrders`(`slug`);
