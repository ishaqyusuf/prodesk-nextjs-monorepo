/*
  Warnings:

  - You are about to drop the column `linkUid` on the `HousePackageTools` table. All the data in the column will be lost.
  - You are about to drop the column `linked` on the `HousePackageTools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `HousePackageTools` DROP COLUMN `linkUid`,
    DROP COLUMN `linked`;

-- AlterTable
ALTER TABLE `SalesOrderItems` ADD COLUMN `multiDyke` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `multiDykeUid` VARCHAR(191) NULL;
