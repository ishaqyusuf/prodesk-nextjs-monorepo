-- AlterTable
ALTER TABLE `OrderItemProductionAssignments` ADD COLUMN `salesItemControlUid` VARCHAR(191) NULL;

-- CreateIndex
CREATE INDEX `OrderItemProductionAssignments_salesItemControlUid_idx` ON `OrderItemProductionAssignments`(`salesItemControlUid`);
