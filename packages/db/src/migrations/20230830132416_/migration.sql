/*
  Warnings:

  - You are about to drop the column `casingId` on the `salesorderitems` table. All the data in the column will be lost.
  - You are about to drop the column `frameId` on the `salesorderitems` table. All the data in the column will be lost.
  - You are about to drop the column `hingeId` on the `salesorderitems` table. All the data in the column will be lost.
  - You are about to drop the column `orderTemplateId` on the `salesorderitems` table. All the data in the column will be lost.
  - You are about to drop the column `orderTemplateItemId` on the `salesorderitems` table. All the data in the column will be lost.
  - You are about to drop the column `productVariantId` on the `salesorderitems` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `salesorderitems` DROP COLUMN `casingId`,
    DROP COLUMN `frameId`,
    DROP COLUMN `hingeId`,
    DROP COLUMN `orderTemplateId`,
    DROP COLUMN `orderTemplateItemId`,
    DROP COLUMN `productVariantId`,
    ADD COLUMN `retailCost` DOUBLE NULL;
