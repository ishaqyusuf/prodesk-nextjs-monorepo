-- AlterTable
ALTER TABLE `OrderItemProductionAssignments` ADD COLUMN `lhQty` INTEGER NULL,
    ADD COLUMN `qtyCompleted` INTEGER NULL,
    ADD COLUMN `rhQty` INTEGER NULL;

-- AlterTable
ALTER TABLE `OrderProductionSubmissions` ADD COLUMN `leftHandle` BOOLEAN NULL DEFAULT false;
