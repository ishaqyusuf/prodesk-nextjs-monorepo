/*
  Warnings:

  - You are about to drop the column `salesOrderId` on the `inboundorderitems` table. All the data in the column will be lost.
  - You are about to drop the column `salesOrderItemId` on the `inboundorderitems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inboundorderitems` DROP COLUMN `salesOrderId`,
    DROP COLUMN `salesOrderItemId`;
