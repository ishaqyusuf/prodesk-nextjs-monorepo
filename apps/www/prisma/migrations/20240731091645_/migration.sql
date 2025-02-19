-- AlterTable
ALTER TABLE `HousePackageTools` ADD COLUMN `stepProductId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `HousePackageTools_stepProductId_idx` ON `HousePackageTools`(`stepProductId`);
