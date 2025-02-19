/*
  Warnings:

  - You are about to drop the column `salesOrderItemsId` on the `HousePackageTools` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderItemId]` on the table `HousePackageTools` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderItemId` to the `HousePackageTools` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `HousePackageTools_salesOrderItemsId_key` ON `HousePackageTools`;

-- AlterTable
ALTER TABLE `HousePackageTools` DROP COLUMN `salesOrderItemsId`,
    ADD COLUMN `orderItemId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `HousePackageTools_orderItemId_key` ON `HousePackageTools`(`orderItemId`);
