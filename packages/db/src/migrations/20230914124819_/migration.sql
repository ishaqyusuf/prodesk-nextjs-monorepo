/*
  Warnings:

  - You are about to drop the column `inboundOrderItemId` on the `salesorderitems` table. All the data in the column will be lost.
  - Added the required column `salesOrderItemId` to the `InboundOrderItems` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inboundorderitems` ADD COLUMN `salesOrderItemId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `salesorderitems` DROP COLUMN `inboundOrderItemId`;
