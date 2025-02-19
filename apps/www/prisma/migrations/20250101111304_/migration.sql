-- AlterTable
ALTER TABLE `DykeSalesDoors` ADD COLUMN `stepProductId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `DykeSalesDoors_stepProductId_idx` ON `DykeSalesDoors`(`stepProductId`);
