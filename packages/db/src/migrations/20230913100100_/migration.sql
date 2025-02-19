/*
  Warnings:

  - You are about to drop the column `checkNo` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `doneBy` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `paidBy` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `taskId` on the `jobs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `inboundorderitems` ADD COLUMN `status` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `inboundorders` ADD COLUMN `supplier` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `jobs` DROP COLUMN `checkNo`,
    DROP COLUMN `doneBy`,
    DROP COLUMN `paidAt`,
    DROP COLUMN `paidBy`,
    DROP COLUMN `taskId`;

-- AlterTable
ALTER TABLE `salesorderitems` ADD COLUMN `inboundOrderItemId` INTEGER NULL,
    ADD COLUMN `supplier` VARCHAR(191) NULL;
