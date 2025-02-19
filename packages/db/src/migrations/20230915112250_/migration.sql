/*
  Warnings:

  - You are about to drop the column `inboundOrdersId` on the `inboundorderitems` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `inboundorderitems` table. All the data in the column will be lost.
  - Made the column `inboundOrderId` on table `inboundorderitems` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `inboundorderitems` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `inboundorderitems` DROP COLUMN `inboundOrdersId`,
    DROP COLUMN `productVariantId`,
    MODIFY `inboundOrderId` INTEGER NOT NULL,
    MODIFY `productId` INTEGER NULL,
    MODIFY `unitCost` DOUBLE NULL,
    MODIFY `totalCost` DOUBLE NULL,
    MODIFY `status` VARCHAR(255) NOT NULL;
